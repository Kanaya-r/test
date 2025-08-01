// import { useRef, useState } from 'react'
import type { Todo } from '../App'

function List({ todos }: { todos: Todo[] }) {
  return (
    <ul>
      { todos.map((todo: Todo) => {
        return (
          <li key={todo.id}>
            <input type="checkbox" />
            {todo.text}
          </li>
        )
      })}
    </ul>
  )
}

export default List
