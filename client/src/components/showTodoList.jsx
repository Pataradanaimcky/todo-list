// src/components/showTodoList.jsx

import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // added

function TodoCard({ data }) {
    const { _id, title, description } = data;
    return (
        <li key={_id}>
            <div className="title-description">
                <h3>{title}</h3>
                <p>{description}</p>
            </div>

            <div className="button-container">
                <button className="button">edit</button>
                <button className="button">delete</button>
            </div>
        </li>
    );
}

export function ShowTodoList() {
    const [todo, setTodo] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:4000/api/todo")
            .then((res) => {
                console.log(res.data);
                setTodo(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <section className="container">
            <Link to="/create-todo" className="button-new">
                <button className="button">New</button>
            </Link>
            <section className="contents">
                <h1>TODO</h1>
                <ul className="list-container">
                    {todo.map((data) => (
                        //map need to have individual key warning fixed
                        <TodoCard key={data._id} data={data} />
                    ))}
                </ul>
            </section>
        </section>
    );
}