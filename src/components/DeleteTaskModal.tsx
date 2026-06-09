import React from 'react'
import TaskModal from './TaskModal'
import { useDeleteTaskMutation } from '../redux/services/taskApi'

interface DeleteTaskModalProps {
    isOpen: boolean;
    onClose: () => void;
    taskId: number | null;
}

const DeleteTaskModal = ({
    isOpen, onClose, taskId
}: DeleteTaskModalProps) => {
    const[deleteTask] = useDeleteTaskMutation()

    const handleDelete = async () => {
        if (!taskId) return;

        try {
            await deleteTask(taskId).unwrap();
            onClose();
        } catch (error) {
            console.error(error);
        }
    }

  return (
    <TaskModal
            isOpen={isOpen}
            onClose={onClose}
            heading="Delete Task"
        >
            <div className="space-y-6">

                <p className="text-gray-700 text-lg">
                    Are you sure you want to delete this task?
                </p>

                <p className="text-red-500 text-sm">
                    This action cannot be undone.
                </p>

                <div className="flex gap-4">

                    <button
                        onClick={onClose}
                        className="
                            flex-1
                            border
                            rounded-lg
                            p-3
                            hover:bg-gray-100
                        "
                    >
                        Cancel
                    </button>

                    <button
                        onClick={handleDelete}
                        className="
                            flex-1
                            bg-red-600
                            text-white
                            rounded-lg
                            p-3
                            hover:bg-red-700
                        "
                    >
                        Delete
                    </button>

                </div>
            </div>
        </TaskModal>
  )
}

export default DeleteTaskModal