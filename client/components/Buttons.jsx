import React, { useState } from "react";

function Buttons(props) {
  const [editButton, setEditButton] = useState(props.buttonState);

  function handleClick(e) {
    e.stopPropagation();
    setEditButton(!editButton);
  }

  return (
    <>
      <div className="ml-auto self-center">
        <button
          onClick={handleClick}
          className="pr-2 transition-opacity hover:opacity-50"
          title="Edit"
        >
          <RiEdit2Fill />
        </button>
        <button
          onClick={() => props.removeItem(props.item.todo_id)}
          className="transition-opacity hover:opacity-50"
          title="Remove"
        >
          <TfiClose />
        </button>
      </div>
    </>
  );
}

export default Buttons;
