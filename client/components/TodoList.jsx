import React, { useState, useEffect } from "react";
import Loading from "../app/loading";

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

  return (
    <>
      {todoData ? (
        todoData.map((items, i) => {
          return (
            <li
              key={i}
              className="flex w-full flex-row items-center justify-start bg-white p-2"
            >
              <input type="checkbox" id={i} />
              <label htmlFor={i}>{items.description}</label>
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
