import { useEffect } from "react"
import { useTodosContext } from "../hooks/useTodosContext"

//components
import ToDoDetails from '../components/ToDoDetails'
import ToDoForm from '../components/TodoForm'

const Home = () => {
  const {todos, dispatch} = useTodosContext()

useEffect(() => {
  const fetchTodos = async () => {
    const response = await fetch('/api/to-dos')
    const json = await response.json()

    if (response.ok) {
     dispatch({type: 'SET_TODOS', payload: json})
    }
  }

  fetchTodos()
}, [dispatch])

  return(
    <div className="home">
    <div className="todos">
      {todos && todos.map((todo) => (
        <ToDoDetails key={todo._id} todo={todo}/>
      ))}
    </div>
        <ToDoForm />
    </div>
  )
}

export default Home