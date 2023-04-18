import React, { useState } from "react";

function TodoEdit() {
  const [updateTodo, setUpdateTodo] = useState[""];
  async function editTodoItem(id) {
    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
    } catch (err) {
      console.error(err.message);
    }
  }
  return (
    <>
      <form method="PUT">
        <input
          onChange={() => {
            null;
          }}
          name="description"
          value={item.description}
          id={item.todo_id}
          type="text"
        />
        <button type="submit">update</button>
      </form>
    </>
  );
}

export default TodoEdit;
