"use client";
import React, { useState, useEffect } from "react";
import Loading from "../app/loading";
import { RiEdit2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";

function TodoList() {
  const [todoData, setTodoData] = useState([]);

  useEffect(() => {
    async function getTodoList() {
      try {
        const res = await fetch("http://localhost:8000/todo");
        const data = await res.json();
        // console.log(data);
        setTodoData(data);
      } catch (err) {
        console.error(err);
      }
    }
    getTodoList();
  }, []);

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

  // console.log(todoData);
  return (
    <>
      {todoData ? (
        todoData.map((items, i) => {
          return (
            <li
              key={i}
              className="flex w-full flex-row items-center bg-white p-2"
            >
              <input type="checkbox" id={items.todo_id} />
              <label htmlFor={items.todo_id}>{items.description}</label>
              <button className="ml-auto pr-2 hover:opacity-50" title="Edit">
                <RiEdit2Fill />
              </button>
              <button
                onClick={() => removeTodoItem(items.todo_id)}
                className="hover:opacity-50"
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
