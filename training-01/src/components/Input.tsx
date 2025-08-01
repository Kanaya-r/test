import { useRef } from 'react'

type InputProps = {
  addTodo: (value: string) => void
}

const Input = ({ addTodo }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null)

  const handleInputEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.nativeEvent.isComposing) {
      e.preventDefault()
      submit()
    }
  }

  const submit = () => {
    const value = inputRef.current?.value || ''
    if (value.trim()) {
      addTodo(value)
      if (inputRef.current) {
        inputRef.current.value = ''
      }
    }
  }

  return (
    <>
      <input type="text" ref={inputRef} onKeyDown={handleInputEnter} />
      <button type="button" onClick={ submit }>追加</button>
    </>
  )
}

export default Input
