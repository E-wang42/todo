import React from "react";
import ListItem from "./ListItem";

function ListContainer(props) {
  return (
    <li
      key={props.item.todo_id}
      className="flex w-full flex-row items-center bg-white p-2"
    >
      <ListItem id={props.item.todo_id} description={props.item.description} />

      <div className="ml-auto flex flex-row">
        <Tippy
          content={
            <span className="rounded bg-slate-800 p-2 text-xs text-yellow-500 opacity-80">
              Edit
            </span>
          }
        >
          <button
            onClick={props.edit}
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
            onClick={props.remove}
            className="transition-opacity hover:opacity-50"
          >
            <TfiClose />
          </button>
        </Tippy>
      </div>
    </li>
  );
}

export default ListContainer;
