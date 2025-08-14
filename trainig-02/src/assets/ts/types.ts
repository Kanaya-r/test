export type LatLng = {
  lat: number
  lng: number
}

export type StampSpot = {
  id: string
  name: string
  location: LatLng
  radiusM: number
  description?: string
}

export type LastPosition = LatLng & {
  accuracyM?: number
  timestamp?: number // Date.now() を入れておくと鮮度判定に使える
}

// ---- 将来のための型バージョン管理 ----
export type ProgressV1 = {
  v: 1
  obtainedSpotIds: string[]
  lastPosition?: LastPosition
}

export type Progress = ProgressV1
