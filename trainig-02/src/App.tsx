import { useCallback } from 'react'
import { FiCheckCircle, FiMapPin, FiArrowRightCircle, FiSquare, FiCompass } from 'react-icons/fi'

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
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-amber-50 to-sky-50 p-4 flex items-start justify-center">
      <div className="w-full max-w-sm">
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 drop-shadow-sm">スタンプラリー</h1>

        <section className="mb-4 rounded-2xl bg-white/80 backdrop-blur shadow-lg ring-1 ring-black/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-pink-700">
              <FiCheckCircle className="text-pink-700" />
              進捗: {state.obtainedSpotIds.length} / {SPOTS.length}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-slate-900">
            <span className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-700 w-7 h-7">
              <FiArrowRightCircle />
            </span>
            <p className="text-base">
              次のスポット: <b>{target ? target.name : 'Complete!!'}</b>
            </p>
          </div>

          <div className="mt-2 flex items-center gap-2 text-sm text-slate-600">
            <span className="inline-flex items-center justify-center rounded-md bg-sky-100 text-sky-700 w-6 h-6">
              <FiCompass />
            </span>
            {state.lastPosition ? (
              <p>
                現在地: {state.lastPosition.lat.toFixed(5)}, {state.lastPosition.lng.toFixed(5)}
                {state.lastPosition.accuracyM ? `（±${Math.round(state.lastPosition.accuracyM)}m）` : ''}
              </p>
            ) : (
              <p>現在地取得中…</p>
            )}
          </div>

          <button
            className="mt-4 w-full rounded-xl border-2 border-dashed border-slate-300 bg-slate-100 text-slate-400 px-4 py-3 font-bold disabled:opacity-70 disabled:cursor-not-allowed"
            onClick={() => {
              if (stamp()) {
                console.log('スタンプ獲得！')
              }
            }}
            disabled={!canStamp}
            aria-disabled={!canStamp}
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
        </section>

        <section className="rounded-2xl bg-white/90 backdrop-blur shadow-lg ring-1 ring-black/5 divide-y divide-slate-100">
          <ol>
            {SPOTS.map((s, i) => {
              const got = state.obtainedSpotIds.includes(s.id)
              const isTarget = i === state.currentIndex
              return (
                <li key={s.id} className="flex items-center gap-3 p-4">
                  <span className="w-6 text-center text-sm font-bold text-slate-400">{i + 1}.</span>
                  <p className="flex-1 text-slate-900 font-medium">
                  {got ?
                      <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 text-emerald-700 px-2.5 py-1 text-sm">
                        <FiCheckCircle />
                      </span>
                    : isTarget ?
                      <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 text-amber-700 px-2.5 py-1 text-sm">
                        <FiArrowRightCircle />
                      </span>
                    :
                      <span className="inline-flex items-center gap-1 rounded-full bg-slate-200 text-slate-600 px-2.5 py-1 text-sm">
                        <FiSquare />
                      </span>
                    }
                    {s.name}
                  </p>
                  <FiMapPin className="text-slate-300" />
                </li>
              )
            })}
          </ol>
        </section>

        <section className="mt-6 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-3">
          <DevButton />
        </section>
      </div>
    </div>
  )
}
