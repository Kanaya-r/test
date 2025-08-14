import type { StampSpot } from './types'

export function validateSpot(spot: StampSpot) {
  const errors: string[] = []
  const { lat, lng } = spot.location

  if (!spot.id) errors.push('必須：id')
  if (!spot.name) errors.push('必須：name')
  if (typeof lat !== 'number' || lat < -90 || lat > 90) errors.push('不正値：緯度')
  if (typeof lng !== 'number' || lng < -180 || lng > 180) errors.push('不正値：経度')
  if (!Number.isFinite(spot.radiusM) || spot.radiusM <= 0) errors.push('radiusM > 0 である必要があります')

  return errors
}

export function assertValidSpots(spots: StampSpot[]) {
  const ids = new Set<string>()
  spots.forEach(s => {
    const errs = validateSpot(s)
    if (ids.has(s.id)) errs.push(`duplicated id: ${s.id}`)
    ids.add(s.id)
    if (errs.length) {
      // 早めに気づけるよう、開発時は throw
      throw new Error(`Invalid spot "${s.name}": ${errs.join(', ')}`)
    }
  })
}
