import { useTodosContext } from "../hooks/useTodosContext";
import formatDistanceToNow from 'date-fns/formatDistanceToNow';
import ModalComponent from "./ModalComponent";
import { useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";

const ToDoDetails = ({ todo }) => {
    const { dispatch } = useTodosContext();
    const {user} = useAuthContext();

    // Function to handle deletion of a todo
    const handleClick = async () => {
        if (!user) {
            return
          }
        const response = await fetch('/api/to-dos/' + todo._id, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${user.token}`
            }
        });
        const json = await response.json();

        if (response.ok) {
            dispatch({ type: 'DELETE_TODO', payload: json });
        }
    };

    // State to manage modal visibility
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Functions to handle modal open and close actions
    const openEditModal = () => {
        setIsModalOpen(true);
    };

    const closeEditModal = () => {
        setIsModalOpen(false);
     
    };

    // Function to handle submission from the modal
    const handleSubmitFromModal = async (updatedTodoData) => {
        const response = await fetch(`/api/to-dos/${todo._id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodoData),
        });

        if (response.ok) {
            const updatedTodo = await response.json();
            dispatch({ type: "UPDATE_TODO", payload: updatedTodo });
        }

        // Close modal after submission
        closeEditModal();
    };

    return (
        <>
            <div className="todo-details">
                <h4>{todo.task}</h4>
                <p><strong>Priority: </strong>{todo.priority}</p>
                <p><strong>Time Commitment (min): </strong>{todo.timeCommitment}</p>
                <p><strong>Completed: </strong>{todo.completed}</p>
                <p>{formatDistanceToNow(new Date(todo.createdAt), { addSuffix: true })}</p>
                <span className='material-symbols-outlined' id="delete" onClick={handleClick}>delete</span>
                <span className='material-symbols-outlined' onClick={openEditModal}>Edit</span>
            </div>

            <ModalComponent
                isModalOpen={isModalOpen}
                closeEditModal={closeEditModal}
                todo={todo}
                onSubmit={handleSubmitFromModal} />
        </>
    );
}

export default ToDoDetails;
