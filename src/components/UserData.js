import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeTask } from "../redux/features/taskManagerSlice";

const UserData = () => {
  const tasks = useSelector((state) => state.taskManager.tasks);
  const dispatch = useDispatch();

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  return (
    <div className="max-w-2xl mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Task List</h1>
      <ul className="space-y-4">
        {tasks.map((task) => (
          <li
            key={task.id}
            className="flex justify-between items-center p-4 bg-gray-100 rounded-lg shadow-md"
          >
            <div>
              <p className="text-lg font-medium">{task.task}</p>
              <p className="text-sm text-gray-600">Deadline: {task.deadline}</p>
            </div>
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserData;
