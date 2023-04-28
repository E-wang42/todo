"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import sun from "../public/icon-sun.svg";
import moon from "../public/icon-moon.svg";
import Loading from "./loading";
import TodoInput from "../components/TodoInput";
import EditModal from "../components/EditModal";
import useColorMode from "../hooks/useColorMode";
const TodoList = dynamic(() => import("../components/TodoList"), {
  ssr: false,
});

export default function Home() {
  const [darkMode, setDarkMode] = useColorMode();
  const [toggle, setToggle] = useState(false);

  function handleClick() {
    setDarkMode(darkMode === "light" ? "dark" : "light");
    setToggle(!toggle);
  }

  return (
    <div>
      <div className="container relative min-h-screen bg-offwhite duration-500 dark:bg-black">
        <div className="absolute z-0 h-[13rem] w-full bg-topBg bg-cover bg-center bg-no-repeat"></div>
        <div className="mx-auto flex h-full w-5/6 flex-col justify-evenly py-12">
          <div className="z-10 flex flex-row items-center justify-between pb-8">
            <h1 className="text-xl font-bold tracking-[0.6rem] text-white">
              TODO
            </h1>
            <button onClick={handleClick}>
              {toggle ? (
                <Image src={sun} alt="sun" />
              ) : (
                <Image src={moon} alt="moon" />
              )}
            </button>
          </div>
          <TodoInput />
          <div className="relative mt-8 w-full">
            <ul className="relative flex w-full flex-col items-start justify-center divide-y-2 rounded-sm shadow-lg">
              <Suspense fallback={<Loading />}>
                <TodoList />
              </Suspense>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
