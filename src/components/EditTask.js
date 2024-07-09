import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useSearchParams, useNavigate } from "react-router-dom";
import { updateTask } from "../redux/features/taskManagerSlice";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function EditTask() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);
  let { id } = useParams();
  const [searchParams] = useSearchParams();
  const taskIndex = searchParams.get("taskIndex");
  // const notify = (message) => toast(message);

  const tasks = useSelector((state) => state.taskManager.tasks[id] || []);

  useEffect(() => {
    if (taskIndex !== null && tasks[taskIndex]) {
      setTask(tasks[taskIndex].task);
      setDeadline(tasks[taskIndex].deadline);
      setCurrentTaskId(tasks[taskIndex].id);
    }
  }, [taskIndex, tasks]);

  const editTaskHandler = (e) => {
    e.preventDefault();
    if (!task || !deadline) {
      toast.warn("Both task and deadline fields are required!");
      return;
    }
    if (currentTaskId) {
      const updatedTask = {
        id: currentTaskId,
        task: task,
        deadline: deadline,
      };
      dispatch(updateTask({ userId: id, task: updatedTask }));
      // notify("User Task Updated!");
      navigate(`/userinfo/${id}`, { state: { taskUpdated: true } });
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="w-full max-w-xs mx-auto">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4" onSubmit={editTaskHandler}>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="task"
            >
              Task
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="task"
              type="text"
              placeholder="task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="deadline"
            >
              Deadline
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="deadline"
              type="date"
              placeholder="Select date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
            />
          </div>
          <div className="flex justify-between w-full">
            <button
              type="button"
              className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              onClick={() => navigate(`/userinfo/${id}`)}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
