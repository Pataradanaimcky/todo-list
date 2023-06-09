import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoCard } from "./showTodoList";
import jwtDecode from "jwt-decode";

export function TodoCalendar() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTodoCard, setShowTodoCard] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decodedToken = jwtDecode(token);
    const userId = decodedToken._id;

    const config = {
      headers: {
        Authorization: token,
      },
    };

    axios
      .get(`http://localhost:4000/api/todo?userId=${userId}`, config)
      .then((res) => {
        setTodos(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setSelectedMonth(date.getMonth());
    setShowTodoCard(false);
  };

  const handleTodoClick = (todo) => {
    setSelectedTodo(todo);
    setShowTodoCard(true);
  };
  const handlePrevMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth - 1);
  };

  const handleNextMonth = () => {
    setSelectedMonth((prevMonth) => prevMonth + 1);
  };

  const getDaysInMonth = (year, month) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthStartDay = (year, month) => {
    return new Date(year, month, 1).getDay();
  };

  const filteredTodos = todos.filter(
    (todo) =>
      todo.dateAdded &&
      new Date(todo.dateAdded).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }) ===
      selectedDate?.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
  );

  const renderCalendar = () => {
    const currentYear = new Date().getFullYear();
    const year = selectedDate ? selectedDate.getFullYear() : currentYear;
    const daysInMonth = getDaysInMonth(year, selectedMonth);
    const monthStartDay = getMonthStartDay(year, selectedMonth);

    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const calendar = [];
    let dayCounter = 1;

    // Render the month label
    const monthLabel = (
        <div key="month-label" className="bg-gray-200 dark:bg-gray-800 p-2 text-center font-semibold text-lg text-black dark:text-white">
          {new Date(year, selectedMonth).toLocaleString("en-US", {
            month: "long",
            year: "numeric",
          })}
        </div>
      );
      calendar.push(monthLabel);
    
      // Render the weekdays
      const weekdaysRow = (
        <div key="weekdays-row" className="grid grid-cols-7 gap-1 p-2">
          {weekdays.map((weekday) => (
            <div
              key={weekday}
              className="text-gray-500 dark:text-gray-300 text-xs font-medium text-center"
            >
              {weekday}
            </div>
          ))}
        </div>
      );
      calendar.push(weekdaysRow);
    
      // Render the dates
      for (let week = 0; week < 6; week++) {
        const days = [];
    
        for (let weekday = 0; weekday < 7; weekday++) {
          if (
            (week === 0 && weekday < monthStartDay) ||
            dayCounter > daysInMonth
          ) {
            days.push(
              <div
                key={`${week}-${weekday}`}
                className="text-gray-400 dark:text-gray-500 text-xs font-medium text-center"
              >
                &nbsp;
              </div>
            );
          } else {
            const date = new Date(year, selectedMonth, dayCounter);
            const day = date.getDate();
    
            days.push(
              <div
                key={`${week}-${weekday}`}
                className={`${
                  date.toDateString() === selectedDate?.toDateString()
                    ? "bg-blue-500 dark:bg-blue-700 text-white"
                    : "text-gray-700 dark:text-gray-200"
                } text-center text-xs font-semibold focus:outline-none hover:bg-blue-100 hover:text-blue-600`}
                onClick={() => handleDateClick(date)}
              >
                {day}
              </div>
            );
    
            dayCounter++;
          }
        }
    
        calendar.push(
          <div key={`week-${week}`} className="grid grid-cols-7 gap-1 p-2">
            {days}
          </div>
        );
      }
    
      return calendar;
    };

  return (
    <div className="mt-8 bg-slate-50 dark:bg-slate-950">
      <div className="flex justify-center">
        <div className="w-96 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
          <div className="flex items-center justify-between bg-black-200 dark:bg-gray-700 p-2 rounded-t-lg">
            <button
              className="text-black-600 dark:text-white hover:text-black-800 dark:hover:text-white focus:outline-none"
              onClick={handlePrevMonth}
            >
              &lt;
            </button>
            <button
              className="text-black-600 dark:text-white hover:text-black-800 dark:hover:text-white focus:outline-none"
              onClick={handleNextMonth}
            >
              &gt;
            </button>
          </div>
          {renderCalendar()}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-black dark:text-whitetext-lg font-semibold">
            Todos for{" "}
            {selectedDate.toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </h3>
          {filteredTodos.length > 0 ? (
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
              {filteredTodos.map((todo) => (
                <div
                  key={todo._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-4 cursor-pointer"
                  onClick={() => handleTodoClick(todo)}
                >
                  <p className="text-gray-800 dark:text-white font-semibold">
                    {todo.title}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300">
                    {todo.description}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-black dark:text-white text-center mt-4">No todos for this date.</p>
          )}
        </div>
      )}
    {showTodoCard && (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50 dark:bg-opacity-50">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mx-4 sm:mx-auto max-w-lg w-full sm:max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-4xl">
        <h3 className="text-black dark:text-white text-lg font-semibold mb-4">
            Todo Details
        </h3>
        <TodoCard data={selectedTodo} />
        <button
            className="button-back bg-blue-500/75 hover:bg-blue-500/90 active:bg-blue-500/50 focus:outline-none focus:ring focus:ring-blue-300 rounded-full px-4 py-2 text-white mt-4"
            onClick={() => setShowTodoCard(false)}
        >
            Back
        </button>
        </div>
    </div>
    )}
    </div>
  );
}
