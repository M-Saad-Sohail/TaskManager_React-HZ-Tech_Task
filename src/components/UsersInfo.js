import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import {
  addTask,
  removeTask,
  updateTask,
} from "../redux/features/taskManagerSlice";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

export default function UsersInfo() {
  let subtitle;
  let { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [addTaskModalIsOpen, setAddTaskModelIsOpen] = useState(false);
  const [editTaskModalIsOpen, setEditTaskModelIsOpen] = useState(false);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const tasks = useSelector((state) => state.taskManager.tasks[id] || []);

  function openModal() {
    setAddTaskModelIsOpen(true);
  }

  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }

  function closeModal() {
    setAddTaskModelIsOpen(false);
  }

  function openEditModal(taskId, task, deadline) {
    setCurrentTaskId(taskId);
    setTask(task);
    setDeadline(deadline);
    let objIndex = tasks.findIndex((index) => taskId === index.id);
    navigate(`/edittask/${id}?taskIndex=${objIndex}`);
  }

  function closeEditModal() {
    setTask("");
    setDeadline("");
    setCurrentTaskId(null);
    setEditTaskModelIsOpen(false);
  }

  const notify = (message) => toast(message);

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (!task || !deadline) {
      notify("Both task and deadline fields are required!");
      return;
    }
    const taskObj = {
      id: Date.now(),
      task: task,
      deadline: deadline,
    };
    dispatch(addTask({ userId: id, task: taskObj }));
    notify("User Task Added!");
    closeModal();
    setTask("");
  };

  const editTaskHandler = (e) => {
    e.preventDefault();
    if (!task || !deadline) {
      notify("Both task and deadline fields are required!");
      return;
    }
    if (currentTaskId) {
      const updatedTask = {
        id: currentTaskId,
        task: task,
        deadline: deadline,
      };
      dispatch(updateTask({ userId: id, task: updatedTask }));
      notify("User Task Updated!");
      closeEditModal();
    }
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask({ userId: id, taskId }));
    notify("Task Removed!");
  };

  return (
    <div>
      <ToastContainer />
      {tasks.length === 0 ? (
        <h1 className="text-2xl font-bold mb-4">No task found for user</h1>
      ) : (
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
                  <p className="text-sm text-gray-600">
                    Deadline: {task.deadline}
                  </p>
                </div>
                <div className="space-x-4">
                  <button
                    onClick={() =>
                      openEditModal(task.id, task.task, task.deadline)
                    }
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Edit Task
                  </button>
                  <button
                    onClick={() => handleRemoveTask(task.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      <Link
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        to="/"
      >
        Back to Users
      </Link>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Tasks
      </button>
      {/* ADD TASK MODAL */}
      <Modal
        isOpen={addTaskModalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Add Task Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add your tasks here</h2>
        <div className="w-full max-w-xs">
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
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={closeModal}
          >
            Close
          </button>
          <button
            type="button"
            onClick={addTaskHandler}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Add Task
          </button>
        </div>
      </Modal>
      {/* ADD TASK MODAL */}

      {/* EDIT TASK MODAL */}
      <Modal
        isOpen={editTaskModalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Edit Task Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>
          Edit Your tasks here
        </h2>
        <div className="w-full max-w-xs">
          <form
            className="bg-white rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={editTaskHandler}
          >
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
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
              />
            </div>
          </form>
        </div>
        <div className="flex justify-between w-full">
          <button
            type="button"
            className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
            onClick={closeEditModal}
          >
            Close
          </button>
          <button
            type="button"
            onClick={editTaskHandler}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
          >
            Edit Task
          </button>
        </div>
      </Modal>
      {/* EDIT TASK MODAL */}
    </div>
  );
}
