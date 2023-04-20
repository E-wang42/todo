import React, { useState } from "react";

function TodoEdit(props) {
  const [updateTodo, setUpdateTodo] = useState(props.todo);

  async function editTodoItem(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/todo/${updateTodo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ updateTodo }),
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  function handleChange(e) {
    setUpdateTodo((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  }

  return (
    <>
      <form onSubmit={editTodoItem}>
        <input
          onChange={handleChange}
          name="description"
          value={updateTodo.description}
          id={updateTodo.todo_id}
          type="text"
        />
        <button type="submit">update</button>
      </form>
    </>
  );
}

export default TodoEdit;
