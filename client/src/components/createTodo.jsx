import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export function CreateTodo() {
  const [data, setData] = useState({ title: "", description: "" });

  function handleChange(e) {
    setData((data) => ({ ...data, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e) {
    e.preventDefault();

    axios
      .post("http://localhost:4000/api/todo", data)
      .then((res) => {
        setData({ title: "", description: "" });
        console.log(res.data.message);
      })
      .catch((err) => {
        console.log("Error couldn't create TODO");
        console.log(err.message);
      });
  }

  return (
    <div className="max-w-md h-64 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-white overflow-hidden flex flex-col justify-between p-4">
      <section className="container">
      <Link to="/" className="button-back bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500/50">
        back
      </Link>
        <section className="contents">
        <form onSubmit={handleSubmit} className="form-container" noValidate>
          <label className="label text-2xl text-black dark:text-white" htmlFor="title">
            Title
          </label>
          <input
            type="text"
            name="title"
            value={data.title}
            onChange={handleChange}
            className="input"
          />
          <label className="label text-2xl text-black dark:text-white" htmlFor="description">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={data.description}
            onChange={handleChange}
            className="input"
          />
          <button type="submit" className="button">
            Create Todo
          </button>
        </form>
        </section>
      </section>
    </div>
  );
}
