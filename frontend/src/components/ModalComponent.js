import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import DropdownList from "react-widgets/DropdownList";

const ModalComponent = ({ isModalOpen, closeEditModal, todo, onSubmit }) => {
  
    // State to hold and prefill todo data
    const [priority, setPriority] = useState(todo.priority || 'High');
    const [timeCommitment, setTimeCommitment] = useState(todo.timeCommitment || '');
    const [completed, setCompleted] = useState(todo.completed || 'no');

    useEffect(() => {
        // Prefill data when the modal is opened with the selected todo's data
        setPriority(todo.priority);
        setTimeCommitment(todo.timeCommitment);
        setCompleted(todo.completed);
    }, [todo, isModalOpen]);

    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Prepare updated data to send back
        const updatedTodoData = {
            priority,
            timeCommitment,
            completed
        };

        // Call the onSubmit callback provided by parent component with updated data
        onSubmit(updatedTodoData);
    };

    return (
        <Modal
            isOpen={isModalOpen}
            onRequestClose={closeEditModal}
            contentLabel="Edit Todo Modal"
        >
            <h2>Edit Todo Item</h2>
            <form className='edit'onSubmit={handleSubmit}>
                <label>Priority: </label>
                <DropdownList
                    value={priority}
                    onChange={(nextValue) => setPriority(nextValue)}
                    data={["High", "Medium", "Low"]}
                /> 

                <label >Time Commitment (min): </label>
                <input
                    className='time'
                    type="number"
                    onChange={(e) => setTimeCommitment(e.target.value)}
                    value={timeCommitment}
                />

                <label>Completed</label>
                <input
                    type="checkbox"
                    onChange={(e) => setCompleted(e.target.checked ? 'yes' : 'no')}
                    checked={completed === 'yes'}
                />

                <button  type="submit">Update</button>
                <br />
                <button onClick={closeEditModal}>Cancel</button>
                <p><i>Refresh page to see updated to-do item after hitting update</i></p>
            </form>
        </Modal>
    );
};

export default ModalComponent;
