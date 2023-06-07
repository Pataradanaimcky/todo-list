import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import { ThemeProvider, ThemeContext } from "./themeContext";
import "./App.css";

function App() {
  return (
    <ThemeProvider>
      <ThemeContext.Consumer>
        {(context) => (
          <div
            className={`min-h-screen ${
              context.theme === "light" ? "bg-slate-50" : "bg-slate-950"
            }`}
          >
            <nav
              className={`${
                context.theme === "light" ? "bg-gray-200" : "bg-gray-800"
              } ${
                context.theme === "light" ? "text-gray-800" : "text-slate-300"
              }`}
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <button
                        className={`${
                          context.theme === "light" ? "bg-blue-500" : "bg-red-500"
                        } hover:${
                          context.theme === "light" ? "bg-blue-600" : "bg-red-600"
                        } text-white font-bold py-2 px-4 rounded`}
                        onClick={context.toggleTheme}
                      >
                        {context.theme === "light" ? "Dark Mode" : "Light Mode"}
                      </button>
                    </div>
                    <div>
                      <div className="ml-10 flex items-baseline space-x-4">
                        <a
                          href="#"
                          className={`rounded-md px-3 py-2 text-sm font-medium ${
                            context.theme === "light"
                              ? "bg-blue-500 text-white"
                              : "bg-slate-700 text-slate-200"
                          }`}
                          aria-current="page"
                        >
                          All
                        </a>
                        <a
                          href="#"
                          className={`rounded-md px-3 py-2 text-sm font-medium ${
                            context.theme === "light"
                              ? "text-blue-400 hover:bg-blue-200 hover:text-blue-800"
                              : "dark:text-gray-300 dark:hover:text-white"
                          }`}
                        >
                          Team
                        </a>
                      </div>
                    </div>
                  </div>
                  {/* Rest of the navigation bar content */}
                </div>
              </div>
            </nav>

            <div className="app-contents min-h-screen bg-slate-50 dark:bg-slate-950">
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<ShowTodoList />} />
                  <Route path="/create-todo" element={<CreateTodo />} />
                </Routes>
              </BrowserRouter>
            </div>
          </div>
        )}
      </ThemeContext.Consumer>
    </ThemeProvider>
  );
}




export default App;
