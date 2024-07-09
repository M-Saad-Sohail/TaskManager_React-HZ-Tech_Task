import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function UserEventList() {
  const [usersApi, setUsersApi] = useState([]);
  const [postData, setPostData] = useState([]);
  let clickTimeout = null;

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => {
        setUsersApi(data);
      })
      .catch((error) => {
        console.error("Error fetching users:", error);
      });
  }, []);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
      .then((response) => response.json())
      .then((data) => {
        const limitedPosts = data.slice(0, 10); // Get only the first 10 items
        setPostData(limitedPosts);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const handleClick = (post) => {
    if (clickTimeout) {
      clearTimeout(clickTimeout);
      clickTimeout = null;
      console.log("double click");
      setPostData((prevPosts) => prevPosts.filter((p) => p.id !== post.id));
      toast.success(`Post with title "${post.title}" has been removed`);
    } else {
      clickTimeout = setTimeout(() => {
        clickTimeout = null;
        console.log("single click");
        const user = usersApi.find((u) => u.id === post.id);
        if (user) {
          toast.success(`${user.name}'s email is: ${user.email}`);
        }
      }, 250);
    }
  };

  return (
    <>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white shadow-md rounded-lg p-6 max-w-md w-full">
          <h1 className="text-2xl font-bold mb-4">Users List</h1>
          <ul>
            {postData.map((post) => (
              <li
                onClick={() => handleClick(post)}
                key={post.id}
                className="mb-2 p-2 bg-gray-200 rounded-md cursor-pointer hover:bg-gray-300"
              >
                {post.title}
              </li>
            ))}
          </ul>
        </div>
        <Link
          to="/"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        >
          Back to users
        </Link>
      </div>
    </>
  );
}
