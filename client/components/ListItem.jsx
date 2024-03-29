"use client";
import React, { useState, useContext } from "react";
import Image from "next/image";
import checkMark from "../public/icon-check.svg";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

function ListItem(props) {
  const [checked, setChecked] = useState(false);

  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.description });

  const style = { transform: CSS.Transform.toString(transform), transition };

  // const handleClick = (e) => {
  //   e.stopPropagation();
  //   setChecked((prevState) => {
  //     return !prevState;
  //   });
  // };

  function handleOnChange() {
    //something
  }

  function handleClick() {
    setChecked(!checked);
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="flex w-full flex-row items-center bg-white p-2"
    >
      <input
        onClick={handleClick}
        // onChange={handleOnChange}
        className="h-6 w-6 cursor-pointer rounded-full accent-purple-500"
        type="checkbox"
        id={props.id}
        value={checked}
        name="checkbox"
      />
      <label
        className={`ml-2 flex cursor-pointer ${
          checked ? "line-through" : "no-underline"
        }`}
        htmlFor={props.id}
      >
        {props.description}
      </label>
    </div>
  );
}

export default ListItem;
