import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams, useSearchParams } from "react-router-dom";

export default function EditTask() {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  let { id } = useParams();
  const [searchParams] = useSearchParams();
  const taskIndex = searchParams.get("taskIndex");

  const tasks = useSelector((state) => state.taskManager.tasks[id] || []);

  useEffect(() => {
    if (taskIndex !== null && tasks[taskIndex]) {
      setTask(tasks[taskIndex].task);
      setDeadline(tasks[taskIndex].deadline);
    }
  }, [taskIndex, tasks]);

  return (
    <>
      <div>EditTask</div>
      <div className="w-full max-w-xs mx-auto">
        <form className="bg-white rounded px-8 pt-6 pb-8 mb-4">
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
        </form>
      </div>
    </>
  );
}
