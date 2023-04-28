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
        {todoData ? (
          todoData.map((item) => {
            return (
              <li
                key={item.todo_id}
                className="flex w-full flex-row items-center bg-white p-2"
              >
                <SortableContext
                  items={item}
                  strategy={verticalListSortingStrategy}
                >
                  <ListItem id={item.todo_id} description={item.description} />
                </SortableContext>

                <div className="ml-auto flex flex-row">
                  <Tippy
                    content={
                      <span className="rounded bg-slate-800 p-2 text-xs text-yellow-500 opacity-80">
                        Edit
                      </span>
                    }
                  >
                    <button
                      onClick={handleClick}
                      className="pr-2 transition-opacity hover:opacity-50"
                    >
                      <RiEdit2Fill />
                    </button>
                  </Tippy>
                  <Tippy
                    content={
                      <span className="rounded bg-slate-800 p-2 text-xs text-red-400 opacity-80">
                        Remove
                      </span>
                    }
                  >
                    <button
                      onClick={() => removeTodoItem(item.todo_id)}
                      className="transition-opacity hover:opacity-50"
                    >
                      <TfiClose />
                    </button>
                  </Tippy>
                </div>
              </li>
            );
          })
        ) : (
          <Loading />
        )}

        {editButton && <EditModal data={todoData} edit={editButton} />}
      </DndContext>
    </>
  );
}

export default TodoList;
