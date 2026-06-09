'use client'
import Image from "next/image";
import TaskList from "../components/TaskList";

export default function Home() {
  return (
    <main className="max-w-310 mx-auto pt-5">
      <h1 className="text-3xl font-bold mb-4">Task Manager</h1>
      <TaskList/>
    </main>
  );
}
