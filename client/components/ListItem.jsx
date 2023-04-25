import React, { useState } from "react";

function ListItem(props) {
  const [checked, setChecked] = useState(false);

  const handleClick = (e) => {
    e.stopPropagation();
    setChecked((prevState) => {
      return !prevState;
    });
  };

  return (
    <>
      <input
        onClick={handleClick}
        className=""
        type="checkbox"
        id={props.id}
        value={checked}
        name="checkbox"
      />
      <label
        className={`ml-2 flex ${checked ? "line-through" : "no-underline"}`}
        htmlFor={props.id}
      >
        {props.description}
      </label>
    </>
  );
}

export default ListItem;
