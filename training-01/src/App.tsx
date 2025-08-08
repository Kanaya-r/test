/* TODO 追加／完了機能に加え、All | Active | Completed のタブで表示を切り替えられるようにする。 */
import { useEffect, useReducer } from 'react'
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
type CompleteAction = {
  type: 'complete'
  todoId: number
}
type TodoAction = AddTodoAction | RemoveAction | CompleteAction

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
      case 'complete':
        return state.map(todo => {
          if (todo.id === action.todoId) {
            return {
              ...todo,
              status: todo.status === 'active' ? 'completed' : 'active'
            }
          }
          return todo
        })
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

  const completeTodo = (todoId: number) => {
    dispatch({ type: 'complete', todoId })
  }

  return (
    <>
      <Input addTodo={ addTodo } />
      <List todoList={ todoList } removeTodo={ removeTodo } completeTodo={ completeTodo }/>
      {/* <button type="button" >完了</button> */}
    </>
  )
}

export default App
