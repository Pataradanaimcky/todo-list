import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
  const [data, setData] = useState({
    title: "",
    description: "",
    priority: "",
    dateAdded: "",
    status: ""
  });
  const [showDescriptionError, setShowDescriptionError] = useState(false);
  const [showCompleteMessage, setShowCompleteMessage] = useState(false);

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    const todoData = {
      title: data.title,
      description: data.description,
      priority: data.priority,
      dateAdded: data.dateAdded,
      status: data.status
    };

    axios
      .post("http://localhost:4000/api/todo", todoData)
      .then((res) => {
        setData({
          title: "",
          description: "",
          priority: "",
          dateAdded: "",
          status: ""
        });
        setShowDescriptionError(false);
        setShowCompleteMessage(true);
        console.log(res.data.message);
      })
      .catch((err) => {
        if (err.response && err.response.data) {
          console.log("Error couldn't create TODO");
          console.log(err.response.data.error); // Log the specific error message
        } else {
          console.log("Error couldn't create TODO");
          console.log(err.message); // Log the general error message
        }
      });
  }

  function handleDescriptionChange(e) {
    const description = e.target.value;
    const words = description.trim().split(" ");
    const limitedWords = words.slice(0, 100);
    const limitedDescription = limitedWords.join(" ");

    setData((data) => ({ ...data, description: limitedDescription }));
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
                <option value="working">Working</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500"
            >
              <svg
                className="w-4 h-4 mr-2 -ml-1 inline-block align-text-bottom transform rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Create Todo
            </button>
          </div>
          {showCompleteMessage && (
            <p className="text-green-500 text-sm mt-4">Todo created successfully!</p>
          )}
        </form>
      </div>
    </div>
  );
}