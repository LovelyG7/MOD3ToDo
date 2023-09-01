
import { useState } from "react";
import DropdownList from "react-widgets/DropdownList";


const TodoForm = () => {
  const [task, setTask] = useState('')
  const [priority, setPriority] = useState('High')
  const [timeCommitment, setTimeCommitment] = useState('')
  const [completed, setCompleted] = useState('no')
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const todo ={task, priority, timeCommitment, completed}
    
    const response = await fetch('/api/to-dos', {
      method: 'POST',
      body: JSON.stringify(todo),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    const json = await response.json()

    if(!response.ok) {
      setError(json.error)
    }
    if(response.ok) {
      setError(null)
      setTask('')
      setPriority('')
      setTimeCommitment('')
      setCompleted('no')
      console.log('new todo item added', json);
    }

  }  
  
  return(
    <form className="create" onSubmit={handleSubmit}> 
      <h3>Add A New Task</h3>

      <label>Task: </label>
      <input
        type="text"
        onChange={(e) => setTask(e.target.value)}
        value={task}
      />

      <label>Time Commitment (min): </label>
      <input
        type="number"
        onChange={(e) => setTimeCommitment(e.target.value)}
        value={timeCommitment}
      />
{/* change these to three color coded buttons for Low, Med, High with event handling*/}
      {/* 
        <select>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option selected value="high">High</option>
        </select>
        onChange={(e) => setTask(e.target.value)}
        value={task} */}

      <label>Priority: </label>
      <DropdownList
      value={priority}
      onChange={(nextValue) => setPriority(nextValue)}
      data={["High", "Medium", "Low"]}
    /> 
     <br/>
     <br/>

{/* fix this to be a checkbox */}
      <label>Completed</label>
      <input
        type="checkbox"
        onChange={(e) => setCompleted(e.target.checked ? 'yes' : 'no')}
        checked={completed === 'yes'}
      />

      <button> Add To-Do Item</button>

      {error && <div className="error">{error}</div>}
    </form>
  )
}

export default TodoForm