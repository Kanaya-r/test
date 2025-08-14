import { useRef, useState } from 'react'
import { GrContact, GrAdd } from "react-icons/gr";

type InputProps = {
  addTodo: (value: string) => void
}

const Input = ({ addTodo }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)
  const [isEmpty, setIsEmpty] = useState(true)

  function handleInputEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  function handleInput() {
    const value = inputRef.current?.value || ''
    setIsEmpty(value.trim() === '')
  }

  function submit() {
    const value = inputRef.current?.value || ''
    if (value.trim()) {
      addTodo(value)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
      setIsEmpty(true)
    }
  }

  return (
    <div className="inputContainer">
      <div className="inputBox">
        <i><GrContact color='#333'/></i>
        <input
          type="text"
          ref={inputRef}
          onInput={handleInput}
          onKeyDown={handleInputEnter}
          placeholder='タスクを作成しよう'
          aria-label='タスク入力'
        />
      </div>
      <button
        type="button"
        onClick={ submit }
        disabled={ isEmpty }
        className="inputButton"
        aria-label='タスク追加'
      >
        <GrAdd color='#fff'/>
      </button>
    </div>
  )
}

export default Input
