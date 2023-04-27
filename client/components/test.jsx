import React, { useState } from "react";
import axios from "axios";

function TodoEdit({ todo, onEdit }) {
  const [description, setDescription] = useState(todo.description);
  const [isEditing, setIsEditing] = useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleInputChange = (e) => {
    setDescription(e.target.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setDescription(todo.description);
  };

  const handleUpdateClick = async (e) => {
    e.preventDefault();
    try {
      const updatedTodo = { ...todo, description };
      await axios.put(
        `http://localhost:8000/todo/${todo.todo_id}`,
        updatedTodo
      );
      onEdit(updatedTodo);
      setIsEditing(false);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <>
      {isEditing ? (
        <form onSubmit={handleUpdateClick}>
          <input
            type="text"
            value={description}
            onChange={handleInputChange}
            placeholder="Edit task"
          />
          <button type="submit">Save</button>
          <button type="button" onClick={handleCancelClick}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <span>{todo.description}</span>
          <button onClick={handleEditClick}>Edit</button>
        </div>
      )}
    </>
  );
}

export default TodoEdit;
