import { createContext, useState, useEffect } from "react";

export const TodoContext = createContext([]);

const ToDoContextProvider = ({ children }) => {
  const [TodoData, setTodoData] = useState([]);
  const [editButton, setEditButton] = useState(true);
  const [darkMode, setDarkMode] = useState(null);
  const [updateTodo, setUpdateTodo] = useState(props.todo);

  return <TodoContext.Provider value={{}}>{children}</TodoContext.Provider>;
};
