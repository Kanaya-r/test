import type { Todo } from '../App'

type ListProps = {
  todoList: Todo[]
  completeTodo: (todoId: number) => void
  removeTodo: (todoId: number) => void
}

function TodoList({ todoList, completeTodo, removeTodo }: ListProps) {
  const activeTodos = todoList.filter(todo => todo.status === 'active')
  return (
    <div className='todoList'>
      <h2>📝 Todo</h2>
      {activeTodos.length === 0 ? (
        <p>タスクがありません</p>
      ) : (
        <ul>
          { todoList.map(todo => {
            const isActiveTodos = todo.status === 'active'
            if(isActiveTodos) {
              return (
                <li key={todo.id}>
                  <input type="checkbox" />
                  <span>{todo.text}</span>
                  <button type="button" onClick={ () => completeTodo(todo.id) } aria-label="ToDo完了">完了</button>
                  <button type="button" onClick={ () => removeTodo(todo.id) } aria-label="ToDo削除">削除</button>
                </li>
              )
            }
          })}
        </ul>
      )}
    </div>
  )
}

export default TodoList
