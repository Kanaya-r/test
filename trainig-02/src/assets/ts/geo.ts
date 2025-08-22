import { getDistance, isPointWithinRadius } from 'geolib'
import type { LatLng } from './types'

// future: 残距離表示や可否判定の精緻化で利用があるかも
export function distanceM(a: LatLng, b: LatLng): number {
  return getDistance(
    { latitude: a.lat, longitude: a.lng },
    { latitude: b.lat, longitude: b.lng }
  )
}

export function withinRadius(pos: LatLng, center: LatLng, radiusM: number): boolean {
  return isPointWithinRadius(
    { latitude: pos.lat, longitude: pos.lng },
    { latitude: center.lat, longitude: center.lng },
    radiusM
  )
}
