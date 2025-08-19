import { useEffect, useMemo, useReducer } from 'react'
import type { Progress, StampSpot, LatLng } from './types'
import { withinRadius } from './geo'

const KEY = 'stamp-progress'
const DEFAULT: Progress = { v: 1, currentIndex: 0, obtainedSpotIds: [] }

type Action =
  | { type: 'load'; p: Progress }
  | { type: 'pos'; lat: number; lng: number; accuracyM?: number }
  | { type: 'advance'; spotId: string }

const MAX_ACCURACY_M = 100 // 精度範囲（距離）※80〜120

function reducer(state: Progress, action: Action): Progress {
  switch (action.type) {
    case 'load':
      return action.p
    case 'pos':
      return {
        ...state,
        lastPosition: { lat: action.lat, lng: action.lng, accuracyM: action.accuracyM }
      }
    case 'advance': {
      if (state.obtainedSpotIds.includes(action.spotId)) return state
      return {
        ...state,
        obtainedSpotIds: [...state.obtainedSpotIds, action.spotId],
        currentIndex: state.currentIndex + 1
      }
    }
    default:
      return state
  }
}

export function useProgress(spots: StampSpot[]) {
  const [state, dispatch] = useReducer(reducer, DEFAULT)

  useEffect(() => {
    const raw = localStorage.getItem(KEY)
    if (!raw) return
    try {
      const obj = JSON.parse(raw)
      if (obj?.v === 1 && Array.isArray(obj?.obtainedSpotIds)) {
        dispatch({ type: 'load', p: obj })
      }
    } catch (e) {
      console.warn('[progress] parse error', (e as Error)?.message)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(state))
  }, [state])

  const target: StampSpot | null = useMemo(() => {
    const idx = state.currentIndex
    return idx < spots.length ? spots[idx] : null
  }, [state.currentIndex, spots])

  const canStamp: boolean = useMemo(() => {
    if (!target) return false
    const pos = state.lastPosition
    if (!pos) return false
    if (pos.accuracyM != null && pos.accuracyM > MAX_ACCURACY_M) return false
    return withinRadius(pos as LatLng, target.location, target.radiusM)
  }, [target, state.lastPosition])

  function stamp(): boolean {
    if (!target || !canStamp) return false
    dispatch({ type: 'advance', spotId: target.id })
    return true
  }

  return {
    state,    // currentIndex / obtainedSpotIds / lastPosition
    dispatch, // 位置更新（type: 'pos'）などに使う
    target,   // 現在の目的地（null なら全達成）
    canStamp, // ボタン活性条件
    stamp,    // ボタン押下時の進行（成功で true）
    maxAccuracyM: MAX_ACCURACY_M
  }
}
