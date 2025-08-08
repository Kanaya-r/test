import type { Todo } from '../App'

type ListProps = {
  todoList: Todo[]
  completeTodo: (todoId: number) => void
  removeTodo: (todoId: number) => void
}

function List({ todoList, completeTodo, removeTodo }: ListProps) {

  return (
    <ul>
      { todoList.map(todo => {
        return (
          <li key={todo.id}>
            <input type="checkbox" />
            <span>{todo.text}</span>
            <button type="button" onClick={ () => completeTodo(todo.id) } aria-label="ToDo完了">完了</button>
            <button type="button" onClick={ () => removeTodo(todo.id) } aria-label="ToDo削除">削除</button>
          </li>
        )
      })}
    </ul>
  )
}

export default List
