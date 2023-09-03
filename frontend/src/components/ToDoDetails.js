import { useTodosContext } from "../hooks/useTodosContext"
//date fns
import formatDistanceToNow from 'date-fns/formatDistanceToNow'

const ToDoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext()

    const handleClick = async () => {
      const response = await fetch('/api/to-dos/' + todo._id, {
        method:'DELETE'
      })
      const json = await response.json()

      if (response.ok) {
        dispatch({type: 'DELETE_TODO', payload: json})
      }
    }

return (
  <div className="todo-details">
    <h4>{todo.task}</h4>
    <p><strong>Priority: </strong>{todo.priority}</p>
    <p><strong>Time Commitment (min): </strong>{todo.timeCommitment}</p>
    <p><strong>Completed: </strong>{todo.completed}</p>
    <p>{formatDistanceToNow(new Date(todo.createdAt),{addSuffix:true})}</p>
    <span className='material-symbols-outlined' onClick={handleClick}>delete</span>
  </div>
)
}

export default ToDoDetails