"use client"
import React, { useState } from 'react'
import { useCreateTaskMutation } from '../redux/services/taskApi'
import TaskModal from './TaskModal';

const CreateTask = (
    {isOpen, onClose}:{isOpen:boolean; onClose: () => void}) => 
{
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [createTask] = useCreateTaskMutation()

    // This is a code for picking the current date and time, and not seeing past dates
    const now_future = new Date()
    const minDate = new Date(now_future.getTime() - now_future.getTimezoneOffset() * 60000).toISOString().slice(0, 16)

    const handleSubmit = async () => {
        try {
            await createTask({
                title, description, dueDate: new Date(dueDate).toISOString()
            }).unwrap()
            setTitle("")
            setDescription("")
            setDueDate("")
            onClose()   
        } catch (error) {
            console.error(error)
        }
    }

    if(!isOpen) return null
  return (
    <TaskModal isOpen={isOpen} onClose={onClose} heading={"Create A Task"}>
        <div className="space-y-4">

            <input
                value={title}
                type="text"
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="
                    border
                    p-3
                    w-full
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Tell us more about this task"
                className="
                    border
                    p-3
                    w-full
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

            <input
                value={dueDate}
                min={minDate}
                type="datetime-local"
                onChange={(e) => setDueDate(e.target.value)}
                className="
                    border
                    p-3
                    w-full
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            />

            <div className="flex gap-4">

                <button
                    onClick={handleSubmit}
                    className="
                        flex-1
                        bg-blue-600
                        text-white
                        p-3
                        rounded-lg
                        hover:bg-blue-700
                    "
                >
                    Create
                </button>

                <button
                    onClick={onClose}
                    className="
                        flex-1
                        border
                        p-3
                        rounded-lg
                        hover:bg-gray-100
                    "
                >
                    Cancel
                </button>

            </div>

        </div>
    </TaskModal>
  )
}

export default CreateTask