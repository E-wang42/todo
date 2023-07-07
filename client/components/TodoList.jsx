"use client";
import React, { useState, useEffect } from "react";
import Loading from "../app/loading";
import TodoEdit from "./TodoEdit";
import ListItem from "./ListItem";
import { RiEdit2Fill } from "react-icons/ri";
import { TfiClose } from "react-icons/tfi";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import EditModal from "./EditModal";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { DndContext, closestCenter } from "@dnd-kit/core";
import ListContainer from "./ListContainer";
// import Buttons from "./Buttons";

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

  function handleClick(e) {
    e.stopPropagation();
    setEditButton(!editButton);
  }

  function handleDragEnd(e) {
    const { active, over } = e;
    if (active.id !== over.id) {
      setTodoData((items) => {
        const activeIndex = items.indexOf(active.id);
        const overIndex = items.indexOf(over.id);
        return arrayMove(items, activeIndex, overIndex);
      });
    }
  }

  return (
    <>
      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext items={item} strategy={verticalListSortingStrategy}>
          {todoData ? (
            todoData.map((item) => {
              return (
                <ListContainer
                  item={item}
                  remove={removeTodoItem}
                  edit={handleClick}
                />
              );
            })
          ) : (
            <Loading />
          )}
        </SortableContext>

        {editButton && <EditModal data={todoData} edit={editButton} />}
      </DndContext>
    </>
  );
}

export default TodoList;
