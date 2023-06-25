"use client";
import { createContext, useContext, useState } from "react";

export const TodoContext = createContext([]);

export const ToDoContextProvider = ({ children }) => {
  const [TodoData, setTodoData] = useState([]);
  const [editButton, setEditButton] = useState(true);
  const [darkMode, setDarkMode] = useState(null);
  // const [updateTodo, setUpdateTodo] = useState(todo);

  return (
    <TodoContext.Provider
      value={{
        TodoData,
        setTodoData,
        editButton,
        setEditButton,
        darkMode,
        setDarkMode,
        // updateTodo,
        // setUpdateTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => {
  useContext(TodoContext);
};
