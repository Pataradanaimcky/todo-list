import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";


export function TodoCard({ data, handleEdit, handleDelete }) {
  const { _id, title, description, priority, dateAdded, status } = data;

  const formattedDate = new Date(dateAdded).toLocaleDateString();

  let statusColor = "";
  let statusText = "";
  if (status === "completed") {
    statusColor = "bg-gray-500";
    statusText = "Completed";
  } else if (status === "working") {
    statusColor = "bg-green-500";
    statusText = "Working";
  }

  const [showStatusPopup, setShowStatusPopup] = useState(false);

  const handleStatusPopup = () => {
    setShowStatusPopup(!showStatusPopup);
  };

  return (
    <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 p-4">
      <div className="max-w-sm mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-slate-500 dark:ring-opacity-50 overflow-hidden relative">
        <div className="p-4">
          <h3 className="text-xl text-black dark:text-white font-bold mb-4">
            {title}
          </h3>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-2">
            {description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
            Priority: {priority}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Date: {formattedDate}
          </p>
        </div>
        <div className="flex justify-end p-4">
          <button
            className={`button-edit bg-sky-500/75 hover:bg-sky-500/90 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500/50 transform hover:scale-105`}
            name={_id}
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="button-delete bg-sky-500/75 hover:bg-sky-500/90 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white ml-2 dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500/50 transform hover:scale-105"
            name={_id}
            onClick={handleDelete}
          >
            Delete
          </button>
          <div
            className={`circle-status ${statusColor} absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center cursor-pointer`}
            onMouseEnter={handleStatusPopup}
            onMouseLeave={handleStatusPopup}
          >
            {showStatusPopup && (
              <div className="status-popup bg-gray-900 text-white text-xs rounded p-1 absolute top-full right-1/2 transform translate-x-1/2">
                {statusText}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}



export function ShowTodoList() {
  const [todo, setTodo] = useState([]);
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const [update, setUpdate] = useState(false);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/todo")
      .then((res) => {
        console.log(res.data);
        setTodo(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [update]);

  function handleEdit(e) {
    setId(e.target.name);
    setOpen(true);
  }

  function handleUpdate() {
    console.log("update:", update, !update);
    setUpdate(!update);
  }

  function handleDelete(e) {
    axios.delete(`http://localhost:4000/api/todo/${e.target.name}`);

    setTodo((data) => {
      return data.filter((todo) => todo._id !== e.target.name);
    });
  }

  function handleClose() {
    setId("");
    setOpen(false);
  }

  const totalTodos = todo.length;
  const completedTodos = todo.filter((t) => t.status === "completed").length; // Calculate completed todos count
  const progress = totalTodos === 0 ? 0 : (completedTodos / totalTodos) * 100; // Calculate progress percentage

  return (
    <section className="bg-slate-50 dark:bg-slate-950 pb-8 sm:pb-16">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mt-8 mb-4">
          <h1 className="text-3xl font-bold dark:text-white">TODO</h1>
          <Link to="/create-todo" className="button-new">
            <button className="text-xl text-white bg-sky-500/75 dark:bg-gray-700 hover:bg-sky-500 hover:text-white dark:hover:bg-gray-800 active:bg-sky-500/50 dark:active:bg-gray-600 focus:outline-none focus:ring focus:ring-violet-300 rounded-lg shadow-xl px-6 py-3">
              New
            </button>
          </Link>
        </div>
        <section className="contents mt-8 mb-16">
          <div className="flex flex-wrap flex-row">
            {todo.map((data) => (
              <TodoCard
                key={data._id}
                data={data}
                handleEdit={handleEdit}
                handleDelete={handleDelete}
              />
            ))}
          </div>
        </section>
        <section className="progress-section mt-4">
        <p className="text-lg font-bold mb-4 dark:text-white">
            Total Todos: {totalTodos} | Completed: {completedTodos}
          </p>
          <div className="w-full bg-gray-200 dark:bg-gray-800 rounded-lg">
            <div
              className="h-4 bg-gradient-to-r from-indigo-600 to-pink-500 rounded-lg"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          <div className="mt-8">
          </div>
        </section>
        {open && (
          <section className="update-container">
            <div className="update-contents">

              <UpdateTodo
                _id={id}
                handleClose={handleClose}
                handleUpdate={handleUpdate}
              />
            </div>
          </section>
        )}
      </div>
    </section>
  );
}
