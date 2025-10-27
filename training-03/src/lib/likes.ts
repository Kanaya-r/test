const KEY = 'likes'

export type LikeMap = Record<string, number>

export function getLikes(): LikeMap {
  if ( typeof window === 'undefined' ) return {}
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function writeLikes(map: LikeMap) {
  if ( typeof window === 'undefined' ) return
  try {
    localStorage.setItem(KEY, JSON.stringify(map))
  } catch {
    return
  }
}