import React, { useState, useEffect } from "react";
import Loading from "../app/loading";
import { RiEdit2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import TodoEdit from "./TodoEdit";

function TodoList() {
  const [todoData, setTodoData] = useState([]);
  const [editButton, setEditButton] = useState(false);
  const [completed, setCompleted] = useState(false);

  //fetches todo list
  useEffect(() => {
    async function getTodoList() {
      try {
        const res = await fetch("http://localhost:8000/todo");
        const data = await res.json();
        setTodoData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getTodoList();
  }, []);

  //remove todo item
  async function removeTodoItem(id) {
    try {
      await fetch(`http://localhost:8000/todo/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      setTodoData(todoData.filter((item) => item.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  // console.log(todoData);
  return (
    <>
      {todoData ? (
        todoData.map((item) => {
          return (
            <li
              key={item.todo_id}
              className="flex w-full flex-row items-center bg-white p-2"
            >
              {!editButton ? (
                <>
                  <input type="checkbox" id={item.todo_id} />
                  <label
                    onClick={() => {
                      setCompleted(!completed);
                    }}
                    className={`${completed ? "line-through" : "no-underline"}`}
                    htmlFor={item.todo_id}
                  >
                    {item.description}
                  </label>
                </>
              ) : (
                <TodoEdit />
              )}
              <button
                onClick={() => {
                  setEditButton(true);
                }}
                className="ml-auto pr-2 transition-opacity hover:opacity-50"
                title="Edit"
              >
                <RiEdit2Fill />
              </button>
              <button
                onClick={() => removeTodoItem(item.todo_id)}
                className="transition-opacity hover:opacity-50"
                title="Remove"
              >
                <TfiClose />
              </button>
            </li>
          );
        })
      ) : (
        <Loading />
      )}
    </>
  );
}

export default TodoList;
