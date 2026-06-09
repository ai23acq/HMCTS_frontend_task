import React, { useEffect } from 'react'
import { IoClose } from "react-icons/io5";

interface CreateTaskModalProps{
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
    heading: React.ReactNode;
}

const TaskModal = ({
    isOpen,
    onClose,
    children,
    heading,
  }: CreateTaskModalProps) => {
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
          if (e.key === "Escape") {
            onClose();
          }
        };
    
        window.addEventListener("keydown", handleEsc);
    
        return () =>
          window.removeEventListener("keydown", handleEsc);
    }, [onClose]);
  return (
    <>
        {/*Overlay*/}
        <div onClick={onClose}
            className={`
            fixed inset-0 z-40
            bg-black/40
            backdrop-blur-sm
            transition-all duration-300
            ${
                isOpen
                ? "opacity-100 visible"
                : "opacity-0 invisible"
            }
            `}
        />
        <div className={`fixed top-0 right-0 z-50 h-screen w-full sm:w-125 bg-white shadow-2xl
          transition-transform duration-300 ease-in-out
          ${
            isOpen
              ? "translate-x-0"
              : "translate-x-full"
          }`
        }>
            <div className="flex justify-between items-center border-b p-5">
                <h2 className="text-2xl font-semibold">
                    {heading}
                </h2>

                <button
                    onClick={onClose}
                    className="
                    text-gray-500
                    hover:text-red-500
                    text-2xl
                    "
                >
                   <IoClose/>
                </button>
            </div>

            <div className="p-5">
                {children}
            </div>
        </div>
    </>
  )
}

export default TaskModal