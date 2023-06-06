import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import "./App.scss";
import { ThemeProvider, ThemeContext } from "./themeContext";

function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div className={`app-contents ${context.theme}`}>
            <button
              className="theme-toggle"
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
