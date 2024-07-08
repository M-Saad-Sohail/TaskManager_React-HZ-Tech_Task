import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function UserEventList() {
  const [usersApi, setUsersApi] = useState([]);
  let clickTimeout = null;
  const notify = (message) => toast(message);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersApi(data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleClick = (user) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      console.log("double click");
      notify(`${user.name} has been removed`);
      setUsersApi((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
        console.log("single click");
        console.log(user);
        notify(`${user.name} email is: \n ${user.email}`);
      }, 250);
    }
  };

  return (
    <>
      <ToastContainer />
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Users List</h1>
          <ul>
            {usersApi.map((user) => (
              <li
                onClick={() => handleClick(user)}
                key={user.id}
                className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                {user.name}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to users
        </Link>
      </div>
    </>
  );
}
