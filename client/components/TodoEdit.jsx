import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";
import Tippy from "@tippyjs/react";

function TodoEdit(props) {
  const [updateTodo, setUpdateTodo] = useState(props.todo);
  const [editButton, setEditButton] = useState(props.edit);

  async function editTodoItem(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/todo/${updateTodo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateTodo),
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
      <form
        className="flex w-full flex-row items-center"
        onSubmit={editTodoItem}
      >
        <input
          onChange={handleChange}
          name="description"
          value={updateTodo.description}
          id={updateTodo.todo_id}
          type="text"
        />
        <Tippy
          content={
            <span className="rounded bg-slate-800 p-2 text-xs text-white opacity-80">
              Update
            </span>
          }
        >
          <button
            className="ml-auto"
            onClick={() => {
              setEditButton(!editButton);
            }}
            type="submit"
          >
            <RxUpdate />
          </button>
        </Tippy>
      </form>
    </>
  );
}

export default TodoEdit;
