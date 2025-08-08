import { useRef, useState } from 'react'

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
    <>
      <input type="text" ref={inputRef} onInput={ handleInput } onKeyDown={ handleInputEnter } />
      <button type="button" onClick={ submit } disabled={ isEmpty }>追加</button>
    </>
  )
}

export default Input
