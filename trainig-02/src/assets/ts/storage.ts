// ToDo：MVPのためライトな実装。堅牢性を高める余地あり。

import type { Progress } from './types'

const KEY = 'stamp-progress'
const DEFAULT_PROGRESS: Progress = { v: 1, currentIndex: 0, obtainedSpotIds: [] }

export function loadProgress(): Progress {
  const raw = localStorage.getItem(KEY)
  if (!raw) return DEFAULT_PROGRESS

  try {
    const obj: unknown = JSON.parse(raw)
    if (obj && typeof obj === 'object' && (obj as any).v === 1 && Array.isArray((obj as any).obtainedSpotIds)) {
      // obj は自身でチェックしてから Progress 型に変換
      return obj as Progress
    }
  } catch (err) {
    console.warn('[progress] parse error, use default', (err as Error)?.message)
  }
  return DEFAULT_PROGRESS
}

export function saveProgress(p: Progress) {
  try {
    localStorage.setItem(KEY, JSON.stringify(p))
  } catch (err) {
    console.warn('[progress] save failed', (err as Error)?.message)
  }
}
