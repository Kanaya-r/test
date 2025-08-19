import type { StampSpot } from './types'

const RADIUS_M_LV1 = 100

export const SPOTS: StampSpot[] = [
  {
    id: 's1',
    name: 'キラキラ公園',
    location: { lat: 42.64329954343844, lng: 141.62239023844242 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP1'
  },
  {
    id: 's2',
    name: '苫小牧駅',
    location: { lat: 42.63988458923986, lng: 141.59698837178598 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP2'
  },
  {
    id: 's3',
    name: 'ふるさと海岸',
    location: { lat: 42.627665929617685, lng: 141.6099380312791 },
    radiusM: RADIUS_M_LV1,
    description: 'STEP3'
  }
]
