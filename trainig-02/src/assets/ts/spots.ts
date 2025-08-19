import type { StampSpot } from './types'

const RADIUS_M_LV1 = 100

export const SPOTS: StampSpot[] = [
  {
    id: 's1',
    name: '拓勇公園',
    location: { lat: 42.67277145098463, lng: 141.67365122514187 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP1'
  },
  {
    id: 's2',
    name: '苫小牧駅',
    location: { lat: 42.63969517343846, lng: 141.5959744521637 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP2'
  },
  {
    id: 's3',
    name: 'ふるさと海岸',
    location: { lat: 42.62851848658491, lng: 141.61288309768256 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP3'
  }
]
