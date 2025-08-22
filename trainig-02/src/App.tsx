import { useCallback } from 'react'
import { FiCheckCircle, FiMapPin, FiArrowRightCircle, FiSquare, FiCompass } from 'react-icons/fi'
import { IoReloadOutline } from "react-icons/io5";

import { SPOTS } from './assets/ts/spots'
import { useGeolocation } from './assets/ts/useGeolocation'
import { useProgress } from './assets/ts/progressStore'

import { H1 } from './components/HeroTitle'
import DevButton from './components/DevButton'
import Modal from './components/Modal'

export default function App() {
  const { state, target, canStamp, stamp, maxAccuracyM, dispatch } = useProgress(SPOTS)

  const onPos = useCallback(
    (p: { lat: number; lng: number; accuracyM?: number }) => {
      dispatch({ type: 'pos', ...p })
    },
    [dispatch]
  )
  useGeolocation(onPos)

  const { refresh, status, lastError } = useGeolocation(onPos, {
    highAccuracy: true,
    initialTimeoutMs: 20000,
    watchTimeoutMs: 15000,
    maximumAgeMs: 5000
  })

  return (
    <div className="min-h-screen bg-gradient-to-b from-pink-50 via-amber-50 to-sky-50 p-4 flex items-start justify-center">
      <div className="grid gap-y-4 w-full max-w-sm">
        <H1>スタンプラリー</H1>
        <Modal />

        <section className="rounded-2xl bg-white/80 backdrop-blur shadow-lg ring-1 ring-black/5 p-4">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <span className="inline-flex items-center gap-1 rounded-full bg-pink-100 px-3 py-1 text-pink-700">
              <FiCheckCircle className="text-pink-700" />
              進捗: {state.obtainedSpotIds.length} / {SPOTS.length}
            </span>
          </div>

          <div className="mt-3 flex items-center gap-2 text-slate-900">
            <span className="inline-flex items-center justify-center rounded-full bg-amber-100 text-amber-700 w-7 aspect-square">
              <FiArrowRightCircle />
            </span>
            <p className="text-base">
              次のスポット: <b>{target ? target.name : '全スポット達成！'}</b>
            </p>
          </div>

          <div className="mt-2 flex items-center gap-1 text-sm text-slate-600">
            <span className="inline-flex items-center justify-center text-sky-700 w-6 aspect-square">
              <FiCompass />
            </span>
            { status === 'error' ? (
              <p>現在地を取得できませんでした…</p>
            ) : status === 'requesting' ? (
              <p>現在地取得中…</p>
            ) : state.lastPosition ? (
              <p>
                現在地: {state.lastPosition.lat.toFixed(5)}, {state.lastPosition.lng.toFixed(5)}
                {state.lastPosition.accuracyM ? `（±${Math.round(state.lastPosition.accuracyM)}m）` : ''}
              </p>
            ) : (
              <p>現在地情報がありません</p>
            )}
            <button type="button" onClick={refresh} name="現在地を更新" className="cursor-pointer">
              <IoReloadOutline className={`${status === 'requesting' ? 'animate-spin' : ''}`} />
            </button>
          </div>

          <button
            className="mt-4 w-full rounded-xl border-2 border-solid border-amber-700 bg-amber-100 text-amber-700 px-4 py-3 font-bold cursor-pointer disabled:border-dashed disabled:opacity-40 disabled:cursor-not-allowed"
            onClick={() => stamp()}
            disabled={!canStamp}
            aria-disabled={!canStamp}
            title={(() => {
              if (!target) return '全スポット達成！'
              if (!state.lastPosition) return '位置情報を取得中…'
              if (state.lastPosition.accuracyM && state.lastPosition.accuracyM > maxAccuracyM) {
                return `位置精度が不十分（±${maxAccuracyM}m 以下で再試行）`
              }
              return canStamp ? `「${target.name}」でスタンプできます` : '目的地に近づいてください'
            })()}
          >
            { !target ? '全スポット達成！' : 'スタンプを押す'}
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
                  <p className="flex items-center gap-1 flex-1 text-slate-900 font-medium">
                  {got ?
                      <span className="inline-flex items-center gap-y-1 text-emerald-700">
                        <FiCheckCircle />
                      </span>
                    : isTarget ?
                      <span className="inline-flex items-center gap-y-1 text-amber-700">
                        <FiArrowRightCircle />
                      </span>
                    :
                      <span className="inline-flex items-center gap-y-1 text-slate-600">
                        <FiSquare />
                      </span>
                    }
                    {s.name}
                  </p>
                  <a href={`https://www.google.com/maps?q=${s.location.lat},${s.location.lng}`} target="_blank" className="p-2 rounded-full hover:bg-slate-300 focus:outline-2 focus:outline-offset-2 focus:bg-slate-300 active:bg-slate-300">
                    <FiMapPin className="text-slate-900" />
                  </a>
                </li>
              )
            })}
          </ol>
        </section>

        <section className="rounded-2xl border border-dashed border-slate-300 bg-white/70 p-3">
          <DevButton />
          <p style={{ opacity: .8 }}>
            <small>
              状態: {status}{status === 'error' && lastError ? ` / エラー: ${lastError}` : ''}
            </small>
          </p>
          <p style={{ opacity: .8 }}>
            {state.lastPosition?.timestampMs && (
              <small>
                最終取得: {new Date(state.lastPosition.timestampMs).toLocaleString('ja-JP', {
                  year: 'numeric',
                  month: '2-digit',
                  day: '2-digit',
                  hour: '2-digit',
                  minute: '2-digit',
                  second: '2-digit'
                })}
              </small>
            )}
          </p>

        </section>
      </div>
    </div>
  )
}
