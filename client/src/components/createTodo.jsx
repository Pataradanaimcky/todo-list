import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import jwtDecode from "jwt-decode";

export function CreateTodo() {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "",
    dateAdded: getCurrentDate(),
    status: "",
  });
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (data.description.trim() === "") {
      setShowDescriptionError(true);
      return;
    }

    const todoData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dateAdded: data.dateAdded,
      status: data.status,
      userId: getUserIdFromToken(),
    };

    const token = localStorage.getItem("token");
    axios
      .post("http://localhost:4000/api/todo", todoData, {
        headers: {
          Authorization: token,
        },
      })
      .then((res) => {
        setData({
          title: "",
          description: "",
          priority: "",
          dateAdded: getCurrentDate(),
          status: "",
        });
        setShowDescriptionError(false);
        setShowCompleteMessage(true);
        console.log(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log("Error couldn't create TODO");
          console.log(err);
        } else {
          console.log("Error couldn't create TODO");
          console.log(err);
        }
      });
  }

  function getUserIdFromToken() {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      return decodedToken._id; // Extract the user ID from the decoded token
    }
    return null;
  }

  function handleDescriptionChange(e) {
    const description = e.target.value;
    const words = description.trim().split(" ");
    const limitedWords = words.slice(0, 100);
    const limitedDescription = limitedWords.join(" ");

    setData((data) => ({ ...data, description: limitedDescription }));
  }

  function getCurrentDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  return (
    <div className="max-w-md mx-auto my-8 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-white overflow-hidden">
      <div className="p-4">
        <Link
          to="/"
          className="bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500"
        >
          <svg
            className="w-5 h-5 mr-1 -ml-1 inline-block align-text-bottom"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </Link>
        <form onSubmit={handleSubmit} className="mt-4" noValidate>
          <div className="mb-4">
            <label className="text-2xl text-black dark:text-white" htmlFor="title">
              Title
            </label>
            <div className="relative rounded-md shadow-md">
              <input
                type="text"
                name="title"
                placeholder="Please input a title"
                value={data.title}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-2xl text-black dark:text-white" htmlFor="description">
              Description
            </label>
            <textarea
              name="description"
              placeholder="Please input a description (100 words max)"
              value={data.description}
              onChange={handleDescriptionChange}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
              rows="4"
            ></textarea>
            {showDescriptionError && (
              <p className="text-red-500 text-sm mt-1">Please enter a description.</p>
            )}
          </div>
          <div className="mb-4">
            <label className="text-2xl text-black dark:text-white" htmlFor="priority">
              Priority
            </label>
            <div className="relative rounded-md shadow-md">
              <select
                name="priority"
                value={data.priority}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a priority</option>
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label className="text-2xl text-black dark:text-white" htmlFor="dateAdded">
              Date Added
            </label>
            <div className="relative rounded-md shadow-md">
              <input
                type="date"
                name="dateAdded"
                placeholder="Select a date"
                value={data.dateAdded}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-2xl text-black dark:text-white" htmlFor="status">
              Status
            </label>
            <div className="relative rounded-md shadow-md">
              <select
                name="status"
                value={data.status}
                onChange={handleChange}
                className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">Select a status</option>
                <option value="working">working</option>
                <option value="completed">Complete</option>
              </select>
            </div>
          </div>
          <div className="flex items-center justify-between mt-6">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Create
            </button>
            {showCompleteMessage && (
              <p className="text-green-500">TODO created successfully!</p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
