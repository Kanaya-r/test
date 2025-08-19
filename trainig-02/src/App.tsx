import { useCallback } from 'react'
import { SPOTS } from './assets/ts/spots'
import { useGeolocation } from './assets/ts/useGeolocation'
import { useProgress } from './assets/ts/progressStore'
import DevButton from './components/DevButton'

export default function App() {
  const { state, target, canStamp, stamp, maxAccuracyM, dispatch } = useProgress(SPOTS)

  const onPos = useCallback(
    (p: { lat: number; lng: number; accuracyM?: number }) => {
      dispatch({ type: 'pos', ...p })
    },
    [dispatch]
  )
  useGeolocation(onPos)

  return (
    <>
      <h1 style={{ margin: 0 }}>スタンプラリー</h1>

      <div style={{ fontSize: 14, opacity: 0.8 }}>
        進捗: {state.obtainedSpotIds.length} / {SPOTS.length}
      </div>

      <div>
        <div style={{ marginBottom: 8 }}>
          次のスポット: <b>{target ? target.name : 'すべて達成！🎉'}</b>
        </div>

        {state.lastPosition ? (
          <small style={{ opacity: 0.8 }}>
            現在地: {state.lastPosition.lat.toFixed(5)}, {state.lastPosition.lng.toFixed(5)}
            {state.lastPosition.accuracyM ? `（±${Math.round(state.lastPosition.accuracyM)}m）` : ''}
          </small>
        ) : (
          <small style={{ opacity: 0.8 }}>現在地取得中…</small>
        )}
      </div>

      <button
        onClick={() => {
          if (stamp()) {
            // クリア演出（任意）：トースト・音など
            console.log('スタンプ獲得！')
          }
        }}
        disabled={!canStamp}
        aria-disabled={!canStamp}
        style={{
          padding: '12px 16px',
          fontSize: 16,
          borderRadius: 12,
          border: '1px solid #ccc',
          opacity: !canStamp ? 0.5 : 1,
          cursor: !canStamp ? 'not-allowed' : 'pointer',
        }}
        title={(() => {
          if (!target) return '全スポット達成！'
          if (!state.lastPosition) return '位置情報を取得中…'
          if (state.lastPosition.accuracyM && state.lastPosition.accuracyM > maxAccuracyM) {
            return `位置精度が不十分（±${maxAccuracyM}m 以下で再試行）`
          }
          return canStamp ? `「${target.name}」でスタンプできます` : '目的地の半径外です'
        })()}
      >
        スタンプを押す
      </button>

      <ol style={{ marginTop: 8 }}>
        {SPOTS.map((s, i) => {
          const got = state.obtainedSpotIds.includes(s.id)
          const isTarget = i === state.currentIndex
          return (
            <li key={s.id}>
              {got ? '✅' : isTarget ? '👉' : '⬜️'} {s.name}
            </li>
          )
        })}
      </ol>

      <div>
        <h2>Progress Reset</h2>
        <DevButton />
      </div>
    </>
  )
}
