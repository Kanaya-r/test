/* TODO 追加／完了機能に加え、All | Active | Completed のタブで表示を切り替えられるようにする。 */
import { useReducer } from 'react'
import Input from './components/Input'
import List from './components/List'
import './App.css'

export type Todo = {
  id: number
  status: 'active' | 'completed'
  text: string
}

type AddTodoAction = {
  type: 'add'
  text: string
}
type RemoveAction = {
  type: 'remove'
  todoId: number
}
type TodoAction = AddTodoAction | RemoveAction

function App() {
  const initialTodoList: Todo[] = []

  const todoReducer = (state: Todo[], action: TodoAction): Todo[] => {
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
      case 'remove':
        return state.filter(todo => todo.id !== action.todoId)
      default:
        return state
    }
  }

  const [ todoList, dispatch ] = useReducer( todoReducer, initialTodoList )

  const addTodo = (text: string) => {
    dispatch({ type: 'add', text })
  }

  const removeTodo = (todoId: number) => {
    dispatch({ type: 'remove', todoId })
  }

  return (
    <>
      <Input addTodo={ addTodo } />
      <List todoList={ todoList } removeTodo={ removeTodo } />
      <button type="button">完了</button>
    </>
  )
}

export default App
