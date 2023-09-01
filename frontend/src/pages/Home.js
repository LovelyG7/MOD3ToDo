import { useEffect, useState } from "react"
import ToDoDetails from '../components/ToDoDetails'
import ToDoForm from '../components/TodoForm'
// import ToDoForm from '../components/TodoFormv2'
const Home = () => {
  const[todos, setTodos] = useState(null)

useEffect(() => {
  const fetchTodos = async () => {
    const response = await fetch('/api/to-dos')
    const json = await response.json()

    if (response.ok) {
      setTodos(json)
    }
  }

  fetchTodos()
}, [])

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