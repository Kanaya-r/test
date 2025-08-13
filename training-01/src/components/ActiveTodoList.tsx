import type { Todo } from '../App'
import { GrCheckmark, GrFormTrash } from "react-icons/gr";

type ListProps = {
  todoList: Todo[]
  completeTodo: (todoId: number) => void
  removeTodo: (todoId: number) => void
}

function TodoList({ todoList, completeTodo, removeTodo }: ListProps) {
  const activeTodos = todoList.filter(todo => todo.status === 'active')
  return (
    <div className='todoList todoList--active'>
      <h2>ToDo</h2>
      {activeTodos.length === 0 ? (
        <p className="emptyMessage">タスクがありません。</p>
      ) : (
        <ul>
          { todoList.map(todo => {
            const isActiveTodos = todo.status === 'active'
            if(isActiveTodos) {
              return (
                <li key={todo.id}>
                  {/* <input type="checkbox" /> */}
                  <span>{todo.text}</span>
                  <div className="buttonArea">
                    <button
                      type="button"
                      onClick={ () => completeTodo(todo.id) }
                      className='listButton'
                      aria-label="ToDo完了"
                      >
                      <GrCheckmark color='#fff' size='0.7em'/>
                    </button>
                    <button
                      type="button"
                      onClick={ () => removeTodo(todo.id) }
                      className='listButton listButton--red'
                      aria-label="ToDo削除"
                      >
                      <GrFormTrash color='#fff'/>
                    </button>
                  </div>
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
