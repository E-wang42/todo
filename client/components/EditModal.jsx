import React, { useState } from "react";
import { RxUpdate } from "react-icons/rx";

function EditModal(props) {
  const [state, setState] = useState(true);
  const [todoData, setTodoData] = useState(props.data);
  const [editButton, setEditButton] = useState(props.edit);

  // console.log(todoData);

  async function editTodoItem(e) {
    e.preventDefault();
    try {
      await fetch(`http://localhost:8000/todo/${setTodoData.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
    } catch (err) {
      console.error(err.message);
    } finally {
      setEditButton(!editButton);
    }
  }

  function handleChange(e) {
    setTodoData((prevState) => {
      return { ...prevState, description: e.target.value };
    });
  }

  return state ? (
    <div className="fixed inset-0 z-10 overflow-y-auto">
      <div
        className="fixed inset-0 h-full w-full bg-black opacity-40"
        onClick={() => setState(false)}
      ></div>
      <div className="flex min-h-screen items-center px-4 py-8">
        <div className="relative mx-auto w-full max-w-lg rounded-md bg-white p-4 shadow-lg">
          <div className="flex justify-end">
            <button
              className="rounded-md p-2 text-gray-400 hover:bg-gray-100"
              onClick={() => setState(false)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="mx-auto h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div className="mx-auto max-w-sm space-y-3 py-3 text-center">
            <h4 className="text-lg font-medium text-gray-800">Edit Todo</h4>
            <form onSubmit={editTodoItem}>
              <div className="relative">
                <RxUpdate className="absolute inset-y-0 left-3 my-auto h-6 w-6 text-gray-400" />
                <input
                  id={todoData.todo_id}
                  name="description"
                  onChange={handleChange}
                  value={todoData.description}
                  type="text"
                  className="w-full rounded-lg border bg-transparent py-2 pl-12 pr-3 text-gray-500 shadow-sm outline-none focus:border-indigo-600"
                />
              </div>
              <button className="mt-3 flex w-full flex-row items-center justify-center gap-x-2 rounded-lg bg-indigo-600 px-4 py-3 text-center text-sm font-medium text-white ring-indigo-600 ring-offset-2 hover:bg-indigo-500 focus:ring-2 active:bg-indigo-700">
                <RxUpdate />
                <p>Edit</p>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  ) : null;
}

export default EditModal;
