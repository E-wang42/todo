import React, { useRef, useState, useEffect } from "react";

function TodoInput() {
  const [description, setDescription] = useState("");
  const inputRef = useRef(null);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      // window.location = "/";
    } catch (err) {
      console.error(err);
    } finally {
      setDescription("");
    }
  }

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="w-full">
        <input
          required
          className="w-full p-2 focus:outline-none"
          type="text"
          placeholder="Create new todo..."
          autoComplete="off"
          onChange={(e) => setDescription(e.target.value)}
          value={description}
          name="description"
          ref={inputRef}
        />
        <button
          className="absolute mt-1 -translate-x-12 border-fuchsia-600 p-2 transition-opacity hover:opacity-50"
          id="submit"
          type="submit"
        >
          Add
        </button>
      </form>
    </>
  );
}

export default TodoInput;
