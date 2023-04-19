import React, { useState } from "react";

function TodoEdit(props) {
  const [updateTodo, setUpdateTodo] = useState(props.todo);

  //   console.log(updateTodo);

  async function editTodoItem(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/todo/${updateTodo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTodo.description),
      });
    } catch (err) {
      console.error(err.message);
    }
  }

  return (
    <>
      <form method="PUT">
        <input
          onChange={(e) => setUpdateTodo(e.target.value)}
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
