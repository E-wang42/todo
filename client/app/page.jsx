"use client";
import React, { useState } from "react";
import Image from "next/image";
import sun from "../public/icon-sun.svg";
import TodoList from "../components/TodoList";

export default function Home() {
  const [description, setDescription] = useState("");
  console.log(description);

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:8000/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description }),
      });
      console.log(response);
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <div className="container relative">
        <div className="absolute -z-10 h-[13rem] w-full bg-topBg bg-cover bg-center bg-no-repeat"></div>
        <div className="mx-auto flex h-full w-5/6 flex-col justify-evenly py-12 ring-2">
          <div className="flex flex-row items-center justify-between pb-8">
            <h1 className="text-xl font-bold tracking-[0.6rem] text-white">
              TODO
            </h1>
            <button>
              <Image src={sun} alt="sun" />
            </button>
          </div>
          <form onSubmit={handleSubmit} className="w-full">
            <input
              className="w-full p-2 focus:outline-none"
              type="text"
              placeholder="Create new todo..."
              autoComplete="off"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              name="text"
            />
          </form>
          <div className="relative mt-8 w-full ring-2">
            <ul className="relative flex w-full flex-col items-start justify-center">
              <TodoList />
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
