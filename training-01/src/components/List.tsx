import type { Todo } from '../App'

type ListProps = {
  todoList: Todo[]
  removeTodo: (todoId: number) => void
}

function List({ todoList, removeTodo }: ListProps) {

  return (
    <ul>
      { todoList.map(todo => {
        return (
          <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.text}</span>
            <button type="button" onClick={ () => removeTodo(todo.id) } aria-label="ToDo削除"></button>
          </li>
        )
      })}
    </ul>
  )
}

export default List
