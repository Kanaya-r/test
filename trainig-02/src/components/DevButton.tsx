import { STORAGE_KEY } from '../assets/ts/constants'

export default function DevButton() {
  function handleReset() {
    localStorage.removeItem(STORAGE_KEY)
    window.location.reload()
  }

  return (
    <button
    onClick={() => { handleReset() }}
    style={{ padding: 8, border: '1px dashed #aaa' }}
    title="開発用：進捗を初期化"
    >
      Reset Progress (DEV)
    </button>
  )
}