import type { Todo } from '../App'
import { GrFormTrash } from "react-icons/gr";

type ListProps = {
  todoList: Todo[]
  removeTodo: (todoId: number) => void
}

function CompleteTodoList({ todoList, removeTodo }: ListProps) {
  return (
    <div className='todoList todoList--completed'>
      <h2>Comleted</h2>
      <ul>
        { todoList.map(todo => {
          const isActiveTodos = todo.status === 'completed'
          if(isActiveTodos) {
            return (
              <li key={todo.id}>
                {/* <input type="checkbox" /> */}
                <span>{todo.text}</span>
                <button type="button" onClick={ () => removeTodo(todo.id) } className='listButton listButton--red' aria-label="ToDo削除">
                  <GrFormTrash color='#fff'/>
                </button>
              </li>
            )
          }
        })}
      </ul>
    </div>
  )
}

export default CompleteTodoList
