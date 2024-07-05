import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
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
  const [modalIsOpen, setIsOpen] = useState(false);
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState("");
  const [userId, setUserId] = useState();

  //   DATA COMING FROM REDUX STORE
  const tasks = useSelector((state) => state.taskManager.tasks);

  //   TASK BEING REMOVED FROM STORE
  const handleRemoveTask = (taskId) => {
    dispatch(removeTask(taskId));
  };

  useEffect(() => {
    setUserId(id);
  }, [id]);

  //   MODAL FUNCTIONALITY
  function openModal() {
    setIsOpen(true);
  }
  function afterOpenModal() {
    subtitle.style.color = "#f00";
  }
  function closeModal() {
    setIsOpen(false);
  }
  //   MODAL FUNCTIONALITY

  const addTaskHandler = (e) => {
    e.preventDefault();
    const taskObj = {
      task: task,
      deadline: deadline,
      id: userId,
    };
    console.log(taskObj);
    dispatch(addTask(taskObj));
    // console.log(`The id for this user is ${userId}`);
    closeModal();
    // navigate(`/userdata`);
  };
    console.log(tasks);
  //   if () {
  //     console.log("Array Empty");
  //   } else {
  //     console.log("Array have objects");
  //   }
  return (
    <div>
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
      )}
      <button
        type="button"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        <Link to="/">Back to Users</Link>
      </button>
      <button
        onClick={openModal}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Add Tasks
      </button>

      {/* MODAL FOR ADDING TASKS */}
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        style={customStyles}
        contentLabel="Example Modal"
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
                type="text"
                placeholder="deadline"
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
    </div>
  );
}
