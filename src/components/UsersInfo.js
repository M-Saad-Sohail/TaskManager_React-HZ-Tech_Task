import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link, useNavigate, useParams, useLocation } from "react-router-dom";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import { addTask, removeTask } from "../redux/features/taskManagerSlice";

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
  const location = useLocation();
  const [addTaskModalIsOpen, setAddTaskModelIsOpen] = useState(false);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [currentTaskId, setCurrentTaskId] = useState(null);

  const tasks = useSelector((state) => state.taskManager.tasks[id] || []);

  useEffect(() => {
    if (location.state?.taskUpdated) {
      toast.success("Task successfully updated!");
      navigate(location.pathname, { replace: true, state: {} });
    }
  }, [location, navigate]);

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

  const addTaskHandler = (e) => {
    e.preventDefault();
    if (!task || !deadline) {
      toast.warn("Both task and deadline fields are required!");
      return;
    }
    const taskObj = {
      id: Date.now(),
      task: task,
      deadline: deadline,
    };
    dispatch(addTask({ userId: id, task: taskObj }));
    toast.success("User Task Added!");
    closeModal();
    setTask("");
  };

  const handleRemoveTask = (taskId) => {
    dispatch(removeTask({ userId: id, taskId }));
    toast.success("Task Removed!");
  };

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggableF
        pauseOnHover
        theme="colored"
        // transition:Bounce
      />
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
        Go Back
      </Link>
      <button
        onClick={openModal}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Add Task
      </button>
      {/* Add Task Modal */}
      <Modal
        isOpen={addTaskModalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Add Task Modal"
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Add Task</h2>
        <button onClick={closeModal}>close</button>
        <div className="w-full max-w-xs">
          <form
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
            onSubmit={addTaskHandler}
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
                placeholder="task"
                value={task}
                onChange={(e) => setTask(e.target.value)}
              />
            </div>
            <div className="mb-6">
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
            <div className="flex items-center justify-between">
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Add Task
              </button>
            </div>
          </form>
        </div>
      </Modal>
    </div>
  );
}
