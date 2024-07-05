import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function Users() {
  const [api, setApi] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setApi(data);
        // console.log(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
        <h1 className="text-2xl font-bold mb-4">Users List</h1>
        <ul>
          {api.map((user) => (
            <li
              onClick={() => navigate(`userinfo/${user.id}`)}
              key={user.id}
              className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer"
            >
              {/* <Link to="/userinfo">{user.name}</Link> */}
              {user.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
