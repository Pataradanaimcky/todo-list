import React, { useState, useEffect } from "react";
import axios from "axios";
import { TodoCard } from "./showTodoList";

export function TodoCalendar() {
  const [todos, setTodos] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [showTodoCard, setShowTodoCard] = useState(false);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/todo")
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

    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    const calendar = [];
    let dayCounter = 1;

    // Render the month label
    const monthLabel = (
      <div className="bg-gray-200 p-2 text-center font-semibold text-lg">
        {new Date(year, selectedMonth).toLocaleString('en-US', { month: 'long', year: 'numeric' })}
      </div>
    );
    calendar.push(monthLabel);

    // Render the weekdays
    const weekdaysRow = (
      <div className="grid grid-cols-7 gap-1 p-2">
        {weekdays.map((weekday) => (
          <div key={weekday} className="text-gray-500 text-xs font-medium text-center">
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
        if ((week === 0 && weekday < monthStartDay) || dayCounter > daysInMonth) {
          days.push(
            <div key={`${week}-${weekday}`} className="text-gray-400 text-xs font-medium text-center">
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
                  ? 'bg-blue-500 text-white'
                  : 'text-gray-700'
              } text-center text-xs font-semibold focus:outline-none hover:bg-blue-100 hover:text-blue-600`}
              onClick={() => handleDateClick(date)}
            >
              {day}
            </div>
          );

          dayCounter++;
        }
      }

      calendar.push(<div key={week} className="grid grid-cols-7 gap-1 p-2">{days}</div>);
    }

    return calendar;
  };

  return (
    <div className="mt-8">
      <div className="flex justify-center">
        <div className="w-96 bg-white rounded-lg shadow-lg">
          <div className="flex items-center justify-between bg-black-200 p-2 rounded-t-lg">
            <button className="text-black-600 hover:text-black-800 focus:outline-none" onClick={handlePrevMonth}>
              &lt;
            </button>
            <button className="text-black-600 hover:text-black-800 focus:outline-none" onClick={handleNextMonth}>
              &gt;
            </button>
          </div>
          {renderCalendar()}
        </div>
      </div>

      {selectedDate && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold">
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
                  className="bg-white rounded-lg shadow-lg p-4 cursor-pointer"
                  onClick={() => handleTodoClick(todo)}
                >
                  <p className="text-gray-800 font-semibold">{todo.title}</p>
                  <p className="text-gray-600">{todo.description}</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center mt-4">No todos for this date.</p>
          )}
        </div>
      )}

      {showTodoCard && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-900 bg-opacity-50">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h3 className="text-lg font-semibold mb-4">Todo Details</h3>
            <TodoCard data={selectedTodo} />
          </div>
        </div>
      )}
    </div>
  );
}