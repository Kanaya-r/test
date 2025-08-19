import { FiRefreshCw } from 'react-icons/fi'

import { STORAGE_KEY } from '../assets/ts/constants'

export default function DevButton() {
  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return (
    <button
    className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900 text-white px-4 py-3 font-semibold shadow active:scale-[0.99]"
    onClick={() => { handleReset() }}
    title="開発用：進捗を初期化"
    >
      <FiRefreshCw /> Reset Progress (DEV)
    </button>
  )
}