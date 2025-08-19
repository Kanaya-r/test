import { useEffect, useRef } from 'react'
import type { CurrentLocation } from './types'

export function useGeolocation( onChange: (p: CurrentLocation) => void ) {
  const watchIdRef = useRef<number | null>(null)

  useEffect(() => {
    if (!('geolocation' in navigator)) {
      console.warn('Geolocation is not supported by this browser.')
      return
    }

    // デバイスの現在位置を取得
    navigator.geolocation.getCurrentPosition(
      (p) => onChange({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        accuracyM: p.coords.accuracy
      }),
      (err) => console.warn('geolocation permission/initial error', err),
      { enableHighAccuracy: true, timeout: 10000 }
    )

    // デバイスの位置情報を監視
    watchIdRef.current = navigator.geolocation.watchPosition(
      (p) => onChange({
        lat: p.coords.latitude,
        lng: p.coords.longitude,
        accuracyM: p.coords.accuracy
      }),
      (err) => console.warn('geolocation watch error', err),
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 10000 }
    )

    return () => {
      if (watchIdRef.current != null) {
        navigator.geolocation.clearWatch(watchIdRef.current)
      }
    }
  }, [onChange])
}
