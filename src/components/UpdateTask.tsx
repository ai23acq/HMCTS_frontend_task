'use client'
import React, {useState, useEffect} from 'react'
import { useUpdateTaskMutation } from '../redux/services/taskApi'
import TaskModal from './TaskModal'

const UpdateTask = ({
    task, isOpen, onClose
}: any) => {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [dueDate, setDueDate] = useState("")
    const [status, setStatus] = useState("")
    const [updateTask] = useUpdateTaskMutation()

    // This is a code for picking the current date and time, and not seeing past dates
    const now_future = new Date()
    const minDate = new Date(now_future.getTime() - now_future.getTimezoneOffset() * 60000).toISOString().slice(0, 16)

    useEffect(() => {
        if(task){
            setTitle(task.title)
            setDescription(task.description)
            setDueDate(task.dueDate)
            setStatus(task.status)
        }
    }, [task])

    const handleUpdate = async() => {
        await updateTask({
            id: task.id, title, description, dueDate, status
        }).unwrap()
        onClose()
    }
    if (!isOpen) return null
  return (
    <TaskModal isOpen={isOpen} onClose={onClose} heading={"Update A Task"}>
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
            <select value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="
                    border
                    p-3
                    w-full
                    rounded-lg
                    focus:outline-none
                    focus:ring-2
                    focus:ring-blue-500
                "
            >
                <option value=""></option>
                <option value="Pending">Pending</option>
                <option value="In_Progress">In Progress</option>
                <option value="Completed">Completed</option>
            </select>

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
                    onClick={handleUpdate}
                    className="
                        flex-1
                        bg-blue-600
                        text-white
                        p-3
                        rounded-lg
                        hover:bg-blue-700
                    "
                >
                    Save
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
    // <div className='fixed inset-0 bg-black/50 flex justify-center items center'>
    //     <div className='bg-white p-5 rounded'>
    //         <h2>Update A Task</h2>
    //         <input
    //             value={title}
    //             type="text"
    //             onChange={(e) => setTitle(e.target.value)}
    //             placeholder="Task title"
    //             className="border p-2 w-full" 
    //         />
    //         <textarea 
    //             value={description}
    //             onChange={(e) => setDescription(e.target.value)}
    //             placeholder="Tell us more about this task"
    //             className="border p-2 w-full">
    //         </textarea>
    //         <select value={status}
    //             onChange={(e) => setStatus(e.target.value)}
    //             className="border p-2 w-full"
    //         >
    //             <option value=""></option>
    //             <option value="Pending">Pending</option>
    //             <option value="In_Progress">In Progress</option>
    //             <option value="Completed">Completed</option>
    //         </select>
    //         <input
    //             value={dueDate}
    //             min={minDate}
    //             type="datetime-local"
    //             onChange={(e) => setDueDate(e.target.value)}
    //             placeholder="Due date"
    //             className="border p-2 w-full" 
    //         />

    //         <button onClick={handleUpdate}>
    //             Save
    //         </button>

    //         <button onClick={onClose}>
    //             Cancel
    //         </button>
    //     </div>
    // </div>
  )
}

export default UpdateTask