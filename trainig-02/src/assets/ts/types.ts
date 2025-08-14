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

export type Progress = {
  v: 1
  currentIndex: number
  obtainedSpotIds: string[]
  lastPosition?: { lat: number; lng: number; accuracyM?: number }
}
