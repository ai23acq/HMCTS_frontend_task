'use client'
import React, {useState} from 'react'
import { 
    useGetTasksQuery,
    useGetSingleTaskQuery,
    useDeleteTaskMutation
} from '../redux/services/taskApi'
import CreateTask from './CreateTask'
import UpdateTask from './UpdateTask'
import { FaEdit } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md"
import DeleteTaskModal from './DeleteTaskModal'

const TaskList = () => {
    const {data: tasks, isLoading, refetch} = useGetTasksQuery(undefined)

    const [showCreate, setShowCreate] = useState(false);
    const [showUpdate, setShowUpdate] = useState(false);
    const [selectedTask, setSelectedTask] = useState(null);
    const [showDelete, setShowDelete] = useState(false);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    if (isLoading) {
        return <p>Loading...</p>;
    }
  return (
    <div>
        <button 
            className='mb-10 mt-5 bg-gray-600 text-xl text-white p-4 hover:bg-white hover:text-gray-600'
            onClick={() => setShowCreate(true)}> Create A Task</button>
            <div className='w-full'>
                <div className='hidden md:block'>
                    {tasks?.length > 0 ? 
                        <table className='table-auto w-full border-collapse'>
                            <thead>
                                <tr className='bg-gray-100 text-left'>
                                    <th className='p-3'>Title</th>
                                    <th className='p-3'>Description</th>
                                    <th className='p-3'>Status</th>
                                    <th className='p-3'>Due Date</th>
                                    <th className='p-3'>Actions</th>
                                </tr>
                            </thead>
                            
                            {tasks?.map((task:any) => (
                                <tbody key={task.id}>
                                    <tr className='border-b'>
                                        <td className='p-3'>{task.title}</td>
                                        <td className='p-3'>{task.description}</td>
                                        {task.status === "In_Progress" 
                                            ?
                                                <td className='p-3'>In Progress</td>
                                            :
                                                <td className='p-3'>{task.status}</td>
                                        }
                                        <td className='p-3'>{task.dueDate}</td>
                                        <td className='p-3 flex justify-around'>
                                            <button
                                                onClick={() => {
                                                setSelectedTask(task);
                                                setShowUpdate(true);
                                                }}
                                            >
                                                <FaEdit size={20} className="text-blue-300"></FaEdit> 
                                            </button>

                                            <button
                                                onClick={() => {
                                                    setSelectedTaskId(task.id);
                                                    setShowDelete(true);
                                                }}
                                            >
                                                <MdDeleteOutline size={20} className="text-red-500"/>
                                            </button> 
                                        </td>
                                    </tr>
                                </tbody>
                            ))}
                        </table>:
                        <p>No task has been created</p>
                    }
                </div>
            </div>
        <CreateTask
            isOpen={showCreate} 
            onClose={() => setShowCreate(false)}
        />
        <UpdateTask
            task={selectedTask}
            isOpen={showUpdate}
            onClose={() => setShowUpdate(false)}
        />
        <DeleteTaskModal
            isOpen={showDelete}
            onClose={() => setShowDelete(false)}
            taskId={selectedTaskId}
        />
    </div>
  )
}

export default TaskList