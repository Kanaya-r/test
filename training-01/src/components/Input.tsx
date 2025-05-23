import { useRef } from 'react';

export type InputProps = {
  addTodo: (value: string) => void;
};

const Input = ({ addTodo }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const value = inputRef.current?.value || '';
    if (value.trim()) {
      addTodo(value);
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    }
  }

  return (
    <>
      <input type="text" ref={inputRef}/>
      <button type="button" onClick={ submit }>追加</button>
    </>
  )
}

export default Input;
