import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import { ThemeProvider, ThemeContext } from "./themeContext";
// import "./App.scss"; // Import the App.scss file
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`app-contents`}>
            <button
              className="bg-red"
              onClick={context.toggleTheme}
            >
              {context.theme === "light" ? "Dark Mode" : "Light Mode"}
            </button>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<ShowTodoList />} />
                <Route path="/create-todo" element={<CreateTodo />} />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}

export default App;
