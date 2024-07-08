import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Users() {
  const [api, setApi] = useState([]);
  const [loading, setLoading] = useState(true); // Added loading state
  const navigate = useNavigate();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setApi(data);
        setLoading(false); // Set loading to false when data is fetched
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false); // Ensure loading is set to false on error
      });
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
          <p className="text-lg font-semibold text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <ul>
          {api.map((user) => (
            <li
              onClick={() => navigate(`userinfo/${user.id}`)}
              key={user.id}
              className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
            >
              {user.name}
            </li>
          ))}
        </ul>
      </div>
      <Link
        to="/usereventlist"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
      >
        Users Info
      </Link>
    </div>
  );
}
