import React from "react";

function TodoList(props) {
  return (
    <li className="flex w-full flex-row items-center justify-start bg-white p-2">
      <input type="radio" id="list" />
      <label htmlFor="list">TODO EXAMPLE</label>
    </li>
  );
}

export default TodoList;
