import React, { useState, useEffect } from "react";
import Loading from "../app/loading";
import TodoEdit from "./TodoEdit";
import ListItem from "./ListItem";
import { RiEdit2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";

function TodoList() {
  const [todoData, setTodoData] = useState([]);
  const [editButton, setEditButton] = useState(false);

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
                <ListItem id={item.todo_id} description={item.description} />
              ) : (
                <TodoEdit todo={item} />
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditButton(!editButton);
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
