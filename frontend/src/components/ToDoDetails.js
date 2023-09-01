const ToDoDetails = ({ todo }) => {
return (
  <div className="todo-details">
    <h4>{todo.task}</h4>
    <p><strong>Priority: </strong>{todo.priority}</p>
    <p><strong>Time Commitment (min): </strong>{todo.timeCommitment}</p>
    <p><strong>Completed: </strong>{todo.completed}</p>
    <p>{todo.createdAt}</p>
  </div>
)
}

export default ToDoDetails