"use client";

import { useEffect, useState } from "react";
import {
  getTask,
  addTask,
  updateTask,
  deleteTask,
  ping,
} from "../api/route";
import MoonLoader from "react-spinners/ClipLoader";


export default function Home() {
  const [taskValue, setTaskValue] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loadingTaskId, setLoadingTaskId] = useState(null);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false); 
  const [modalTaskValue, setModalTaskValue] = useState("");
  const [isDisable, setIsDisable] = useState(false);
 
  const handleSubmit = async () => {
    setIsDisable(true);
    if (taskValue) {  
      await addTask(taskValue);
      setTaskValue(""); 
      fetchTask(); 
    }
    setIsDisable(false);
  };

  const handleMark = async (id, data) => {
    setLoadingTaskId(id);
    await updateTask(id, data);
    fetchTask();
  };

  const handleEdit = (id, currentTask) => {
    setEditingTaskId(id);
    setModalTaskValue(currentTask); // Set the modal input field with the current task's value
    setIsModalOpen(true); // Open the modal
  };

  const handleUpdate = async () => {
    if (modalTaskValue && editingTaskId) {
      await updateTask(editingTaskId, { "task": modalTaskValue });
      setModalTaskValue("");
      setEditingTaskId(null); 
      setIsModalOpen(false); 
      fetchTask();
    }
  };

  const handleDelete = async (id) => {
    setLoadingTaskId(id);
    await deleteTask(id);
    fetchTask();
  }

  const fetchTask = async () => {
    const data = await getTask();
    setTasks(data); 
    setLoadingTaskId(null);
  };

  useEffect(() => {
    ping();
    fetchTask();
  }, []);


  return (
    <div className="lg:px-48 px-5">
      <div className="flex items-center my-10 gap-8">
        <input
          type="text"
          value={taskValue}
          onChange={(e) => setTaskValue(e.target.value)}
          placeholder="Enter your task"
          className="flex-1 w-full border rounded-xl p-3 bg-gray-100"
        />
        <button
           onClick={handleSubmit}
           disabled = {isDisable}
          className={`w-fit h-full hover:bg-[#674ee1] px-10 py-3 rounded-xl text-white ${isDisable ? "bg-gray-500" : "bg-[#7e64ff]" }`}
        >
          Add Task
        </button>
      </div>

      <div className="text-3xl font-semibold">Your Tasks</div>
      <div className="w-full my-5">
        {tasks.length === 0 ?  (
          <div className="text-gray-400"> No Task is there </div>
        ) : (
          tasks.map((task) => (
            <div key={task._id} className="flex items-center w-full justify-between gap-5 px-5 py-2 border text-lg">
              {loadingTaskId === task._id ? (
                  <MoonLoader size={20} className="text-center" />
                ) : (
                  <input 
                    type="checkbox" 
                    checked={task.is_completed} 
                    onChange={() => handleMark(task._id, { "is_completed": !task.is_completed })}
                  />
                )}
              <div className={`w-full text-start ${task.is_completed ? 'text-gray-400 line-through' : 'text-black'}`}>{task.task}</div>
              <div className="flex items-center justify-between gap-5">
                <button className="text-blue-500 hover:underline hover:text-blue-700" onClick={() => handleEdit(task._id, task.task)}>Edit</button>
                <button className="text-red-500 hover:underline hover:text-red-700" onClick={() => handleDelete(task._id)}>Delete</button>
              </div>
            </div>
          ))
        ) }
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-10 backdrop-blur-md flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96">
            <div className="text-xl font-semibold mb-4">Edit Task</div>
            <input
              type="text"
              value={modalTaskValue}
              onChange={(e) => setModalTaskValue(e.target.value)}
              className="w-full border rounded-xl p-3 mb-4"
              placeholder="Edit your task"
            />
            <div className="flex justify-between px-5">
              <button
                onClick={() => setIsModalOpen(false)} // Close the modal
                className="text-red-500"
              >
                Cancel
              </button>
              (<button
                onClick={handleUpdate} // Update task and close modal
                className="text-blue-500"
              >
                Update Task
              </button>)
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
