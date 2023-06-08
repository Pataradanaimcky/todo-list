import { useState, useEffect } from "react";
import axios from "axios";

export function UpdateTodo({ _id, handleClose, handleUpdate }) {
  const [data, setData] = useState({
    title: "",
    description: "",
    status: "",
    priority: "",
    dateAdded: "",
  });

  const [error, setError] = useState("");

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/todo/${_id}`)
      .then((res) => {
        const { title, description, dateAdded } = res.data; // Extract the dateAdded field
        setData({ title, description, dateAdded }); // Add dateAdded to the state
      })
      .catch((err) => {
        console.log("Failed to fetch todo");
        console.log(err.message);
      });
  }, [_id]);
  
  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
  
    if (!data.title || !data.description) {
      setError("Title and description are required");
      return;
    }
  
    const updatedData = {
      ...data,
      dateAdded: new Date().toISOString(), // Update the dateAdded field with the current date
    };
  
    axios
      .put(`http://localhost:4000/api/todo/${_id}`, updatedData) // Use updatedData instead of data
      .then((res) => {
        setData({
          title: "",
          description: "",
          status: "",
          priority: "",
          dateAdded: "",
        });
        console.log(res.data.message);
        handleUpdate();
        handleClose();
      })
      .catch((err) => {
        console.log("Failed to update todo");
        console.log(err.message);
      });
  }

  return (
    <div className="max-w-md mx-auto my-0 bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-white overflow-hidden">
      <div className="p-4">
        <h2 className="text-2xl text-black dark:text-white mb-4">Update Todo</h2>
        {error && <p className="text-red-500">{error}</p>}
        <form onSubmit={handleSubmit}>
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
            <input
              type="text"
              name="description"
              placeholder="Please input a description"
              value={data.description}
              onChange={handleChange}
              className="block w-full rounded-md border-0 py-2 px-3 text-gray-900 shadow-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
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
                <option value="completed">Complete</option>
                <option value="working">Working</option>
              </select>
            </div>
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500"
            >
              Update
            </button>
            <button
              type="button"
              className="bg-blue-500/75 hover:bg-blue-500 active:bg-blue-500/50 focus:outline-none focus:ring focus:ring-blue-300 rounded-full px-4 py-2 text-white ml-2 dark:bg-blue-500/75 dark:hover:bg-blue-500 dark:active:bg-blue-500"
              onClick={handleClose}
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
