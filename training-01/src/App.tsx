/* TODO 追加／完了機能に加え、All | Active | Completed のタブで表示を切り替えられるようにする。 */
import { useReducer } from 'react'
import Input from './components/Input'
import './App.css'

interface Todo {
  id: number
  status: 'active' | 'completed'
  text: string
}

interface Action {
  type: 'add'
  text: string
}

function App() {
  const todoReducer = (state: Todo[], action: Action): Todo[] => {
    switch ( action.type ) {
      case 'add':
        return [
          ...state,
          {
            id: Date.now(),
            status: 'active',
            text: action.text
          }
        ]
      default:
        return state
    }
  }

  const initialTodos: Todo[] = [
    {
      id: 0,
      status: 'active',
      text: 'todo1'
    }
  ]

  const [ todos, dispatch ] = useReducer( todoReducer, initialTodos )

  const addTodo = (text: string) => {
    dispatch({ type: 'add', text })
  }


  return (
    <>
      <Input addTodo={ addTodo } />
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
      <button type="button">完了</button>
    </>
  )
}

export default App
