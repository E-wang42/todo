"use client";
import React, { Suspense, useState } from "react";
import Image from "next/image";
import sun from "../public/icon-sun.svg";
import moon from "../public/icon-moon.svg";
import Loading from "./loading";
import TodoInput from "../components/TodoInput";
const TodoList = React.lazy(() => import("../components/TodoList"));

export default function Home() {
  const [darkMode, setDarkMode] = useState(null);

  return (
    <div>
      <div className="container relative">
        <div className="absolute -z-10 h-[13rem] w-full bg-topBg bg-cover bg-center bg-no-repeat"></div>
        <div className="mx-auto flex h-full w-5/6 flex-col justify-evenly py-12">
          <div className="flex flex-row items-center justify-between pb-8">
            <h1 className="text-xl font-bold tracking-[0.6rem] text-white">
              TODO
            </h1>
            <button
              onClick={() => {
                setDarkMode(!darkMode);
              }}
            >
              {darkMode ? (
                <Image src={sun} alt="sun" />
              ) : (
                <Image src={moon} alt="moon" />
              )}
            </button>
          </div>
          <TodoInput />
          <div className="relative mt-8 w-full ">
            <ul className="relative flex w-full flex-col items-start justify-center divide-y-2">
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
