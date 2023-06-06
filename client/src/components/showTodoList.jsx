import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { UpdateTodo } from "./updateTodo";

function TodoCard({ data, handleEdit, handleDelete }) {
    const { _id, title, description } = data;
  
    return (
      <div className="w-1/4 px-4 mb-8">
        <div className="bg-white dark:bg-gray-900 shadow-md rounded-md p-4">
          <h3 className="text-lg text-black font-bold mb-2 dark:text-white font-bold mb-2">
            {title}
          </h3>
          <p className="text-gray-700 dark:text-gray-300">{description}</p>
          <div className="mt-4">
            <button className="button" name={_id} onClick={handleEdit}>
              Edit
            </button>
            <button className="button" name={_id} onClick={handleDelete}>
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
        <section className="container mx-auto px-4 shadow-2xl">
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
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