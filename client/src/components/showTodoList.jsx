import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description } = data;

    return (
        <div className="w-full md:w-1/2 lg:w-1/3 px-4 mb-8">
        <div className="max-w-md h-64 mx-auto bg-white dark:bg-gray-800 rounded-xl shadow-md dark:shadow-lg dark:shadow-gray-400 overflow-hidden flex flex-col justify-between p-4">
            <div>
            <h3 className="text-2xl text-black dark:text-white font-bold mb-4">
                {title}
            </h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 mb-4">
                {description}
            </p>
            </div>
            <div className="flex justify-end">
            <button
                className="button-edit bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500/50"
                name={_id}
                onClick={handleEdit}
            >
                Edit
            </button>
            <button
                className="button-delete bg-sky-500/75 hover:bg-sky-500 active:bg-sky-500/50 focus:outline-none focus:ring focus:ring-violet-300 rounded-full px-4 py-2 text-white ml-2 dark:bg-indigo-500/75 dark:hover:bg-indigo-500 dark:active:bg-indigo-500/50"
                name={_id}
                onClick={handleDelete}
            >
                Delete
            </button>
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

    useEffect(
        function () {
            axios
                .get("http://localhost:4000/api/todo")
                .then((res) => {
                    console.log(res.data);
                    setTodo(res.data);
                })
                .catch((err) => {
                    console.log(err.message);
                });
        },
        [update]
    );

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

    return (
        <section className="container mx-auto px-4 bg-slate-50 dark:bg-slate-950">
            <Link to="/create-todo" className="button-new">
                <button className="
                    text-xl
                    text-white
                    bg-sky-500/75 dark:bg-gray-700
                    hover:bg-sky-500 hover:text-white
                    dark:hover:bg-gray-800
                    active:bg-sky-500/50
                    dark:active:bg-gray-600
                    focus:outline-none focus:ring
                    focus:ring-violet-300
                    rounded-lg 
                    shadow-xl
                    px-6 py-3
                ">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        <TodoCard
                            key={data._id} // Add a unique key prop
                            data={data}
                            handleEdit={handleEdit}
                            handleDelete={handleDelete}
                        />
                    ))}
                </ul>
            </section>
            {open ? (
                <section className="update-container">
                    <div className="update-contents">
                        <p onClick={handleClose} className="close">
                            &times;
                        </p>

                        <UpdateTodo
                            _id={id}
                            handleClose={handleClose}
                            handleUpdate={handleUpdate}
                        />
                    </div>
                </section>
            ) : (
                ""
            )}
        </section>
    );
}