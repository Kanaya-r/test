import { useEffect, useRef, useCallback, useState } from 'react'
import type { CurrentLocation } from './types'

type GeoStatus = 'idle' | 'requesting' | 'watching' | 'error' | 'unsupported'

type GeoOptions = {
  highAccuracy?: boolean
  initialTimeoutMs?: number
  watchTimeoutMs?: number
  maximumAgeMs?: number
}

export function useGeolocation(
  onChange: (p: CurrentLocation) => void,
  {
    highAccuracy = true,
    initialTimeoutMs = 15000,
    watchTimeoutMs = 10000,
    maximumAgeMs = 5000
  }: GeoOptions = {}
) {
  const watchIdRef = useRef<number | null>(null)
  const [status, setStatus] = useState<GeoStatus>('idle')
  const [lastError, setLastError] = useState<string | null>(null)

  const stopWatch = useCallback(() => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current)
      watchIdRef.current = null
    }
    // ページは開いているがウォッチ停止中、という意味で 'idle'
    setStatus((s) => (s === 'unsupported' ? s : 'idle'))
  }, [])

  const startWatch = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      setLastError('Geolocation unsupported')
      return
    }
    // すでにウォッチ中なら二重起動しない
    if (watchIdRef.current != null) return

    setStatus('requesting')
    setLastError(null)

    // 初回：許可プロンプト兼ねて1回取得してから watch 開始
    navigator.geolocation.getCurrentPosition(
      (p) => {
        onChange({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracyM: p.coords.accuracy
        })

        // 継続監視を開始（可視中のみ）
        watchIdRef.current = navigator.geolocation.watchPosition(
          (p2) => {
            onChange({
              lat: p2.coords.latitude,
              lng: p2.coords.longitude,
              accuracyM: p2.coords.accuracy
            })
            setStatus('watching')
          },
          (err) => {
            console.warn('geolocation watch error', err)
            setStatus('error')
            setLastError(`(${err.code}): ${err.message}`)
            // 失敗したら一旦停止しておく（可視復帰時に再トライ）
            stopWatch()
          },
          { enableHighAccuracy: highAccuracy, maximumAge: maximumAgeMs, timeout: watchTimeoutMs }
        )
      },
      (err) => {
        console.warn('geolocation permission/initial error', err)
        setStatus('error')
        setLastError(`(${err.code}): ${err.message}`)
      },
      { enableHighAccuracy: highAccuracy, timeout: initialTimeoutMs, maximumAge: 0 }
    )
  }, [onChange, highAccuracy, initialTimeoutMs, watchTimeoutMs, maximumAgeMs, stopWatch])

  // 手動で一度だけ取得（「現在地更新」ボタンなど）
  const refresh = useCallback(() => {
    if (!('geolocation' in navigator)) {
      setStatus('unsupported')
      setLastError('Geolocation unsupported')
      return
    }
    setStatus('requesting')
    setLastError(null)

    navigator.geolocation.getCurrentPosition(
      (p) => {
        onChange({
          lat: p.coords.latitude,
          lng: p.coords.longitude,
          accuracyM: p.coords.accuracy
        })
        // refresh はウォッチ状態を変えない（既に回っていれば 'watching' のまま）
        setStatus((s) => (watchIdRef.current != null ? 'watching' : 'idle'))
      },
      (err) => {
        console.warn('geolocation one-time error', err)
        setStatus('error')
        setLastError(`(${err.code}): ${err.message}`)
      },
      { enableHighAccuracy: highAccuracy, timeout: initialTimeoutMs, maximumAge: 0 }
    )
  }, [onChange, highAccuracy, initialTimeoutMs])

  // 可視性に応じて start/stop
  useEffect(() => {
    // 初期可視状態に合わせる
    if (typeof document !== 'undefined' && document.visibilityState === 'visible') {
      startWatch()
    }

    const onVisibilityChange = () => {
      if (document.visibilityState === 'visible') {
        startWatch()
      } else {
        // hidden なら止める（バックグラウンド時の無駄な消費や例外を防ぐ）
        stopWatch()
      }
    }

    // iOS/Safari 対策：pagehide/pageshow（BFCache 復帰も拾う）
    const onPageShow = () => {
      // pageshow は復帰時に常に来る（persisted=true でも）
      startWatch()
    }
    const onPageHide = () => {
      stopWatch()
    }

    // 一部ブラウザは focus/blur の方が安定して拾える
    const onFocus = () => startWatch()
    const onBlur = () => stopWatch()

    document.addEventListener('visibilitychange', onVisibilityChange)
    window.addEventListener('pageshow', onPageShow)
    window.addEventListener('pagehide', onPageHide)
    window.addEventListener('focus', onFocus)
    window.addEventListener('blur', onBlur)

    return () => {
      document.removeEventListener('visibilitychange', onVisibilityChange)
      window.removeEventListener('pageshow', onPageShow)
      window.removeEventListener('pagehide', onPageHide)
      window.removeEventListener('focus', onFocus)
      window.removeEventListener('blur', onBlur)
      stopWatch()
    }
  }, [startWatch, stopWatch])

  return {
    refresh,          // 手動1回取得
    status,           // 'idle' | 'requesting' | 'watching' | 'error' | 'unsupported'
    lastError,
    // 任意：UIから明示的に止めたい／再開したい場合に使える
    pause: stopWatch,
    resume: startWatch
  }
}
