import React, { useState, useContext, useEffect } from "react";
import { Routes, Route, useLocation, Link, useNavigate } from "react-router-dom";
import { ShowTodoList } from "./components/showTodoList";
import { CreateTodo } from "./components/createTodo";
import { TodoCalendar } from "./components/calendarTodo";
import { ThemeProvider, ThemeContext } from "./themeContext";
import { LoginPage } from "./page/login";
import { SignupPage } from "./page/signup";
import jwtDecode from "jwt-decode";
import { BrowserRouter } from "react-router-dom";
import "./App.css";

function App() {
  const location = useLocation();
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
  const [userName, setUserName] = useState(""); // Store the user name

  const navigate = useNavigate(); // Add the useNavigate hook

  useEffect(() => {
    // Check if a token exists in local storage to determine login status
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
    // Extract the user name from the token and set it in the state
    if (token) {
      const decodedToken = jwtDecode(token);
      setUserName(decodedToken.username);
    }

    // Update document title when the location changes
    document.title = location.pathname; // Set the document title to the current pathname
  }, [location]);

  const handleLogout = () => {
    // Clear the token and navigate to the login page
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/login"); // Add the useNavigate hook
  };

  return (
    <div
      className={`min-h-screen ${
        theme === "light" ? "bg-slate-50" : "bg-slate-950"
      }`}
    >
      <nav
        className={`${
          theme === "light" ? "bg-gray-200" : "bg-gray-800"
        } ${
          theme === "light" ? "text-gray-800" : "text-slate-300"
        }`}
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button
                  className="bg-transparent focus:outline-none ml-auto flex items-center"
                  onClick={toggleTheme}
                >
                    {theme === "light" ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="black"
                        className="w-6 h-6"
                      >
                        <path
                          fillRule="evenodd"
                          d="M9.528 1.718a.75.75 0 01.162.819A8.97 8.97 0 009 6a9 9 0 009 9 8.97 8.97 0 003.463-.69.75.75 0 01.981.98 10.503 10.503 0 01-9.694 6.46c-5.799 0-10.5-4.701-10.5-10.5 0-4.368 2.667-8.112 6.46-9.694a.75.75 0 01.818.162z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="white"
                        className="w-6 h-6"
                      >
                        <path d="M12 2.25a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zM7.5 12a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM18.894 6.166a.75.75 0 00-1.06-1.06l-1.591 1.59a.75.75 0 101.06 1.061l1.591-1.59zM21.75 12a.75.75 0 01-.75.75h-2.25a.75.75 0 010-1.5H21a.75.75 0 01.75.75zM17.834 18.894a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 10-1.061 1.06l1.59 1.591zM12 18a.75.75 0 01.75.75V21a.75.75 0 01-1.5 0v-2.25A.75.75 0 0112 18zM7.758 17.303a.75.75 0 00-1.061-1.06l-1.591 1.59a.75.75 0 001.06 1.061l1.591-1.59zM6 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h2.25A.75.75 0 016 12zM6.697 7.757a.75.75 0 001.06-1.06l-1.59-1.591a.75.75 0 00-1.061 1.06l1.59 1.591z"
                        />
                      </svg>
                    )}
                  </button>
              </div>
              <div>
                <div className="ml-10 flex items-baseline space-x-4">
                  {isLoggedIn ? (
                    <>
                      <span className="text-black text-bold dark:text-white">Welcome</span>
                      <Link
                        to="/"
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          theme === "light"
                            ? location.pathname === "/"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-800"
                            : location.pathname === "/"
                            ? "bg-slate-700 text-slate-200"
                            : "dark:text-gray-300 dark:hover:text-white"
                        }`}
                        aria-current={location.pathname === "/" ? "page" : undefined}
                      >
                        All Todo Cards
                      </Link>
                      <Link
                        to="/calendar"
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          theme === "light"
                            ? location.pathname === "/calendar"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-800"
                            : location.pathname === "/calendar"
                            ? "bg-slate-700 text-slate-200"
                            : "dark:text-gray-300 dark:hover:text-white"
                        }`}
                      >
                        Calendar
                      </Link>
                      <Link
                        to="/login"
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          theme === "light"
                            ? "bg-blue-100 text-blue-500 hover:bg-blue-200 hover:text-blue-800"
                            : "dark:text-gray-300 dark:hover:text-white"
                        }`}
                        onClick={handleLogout}
                      >
                        Logout
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          theme === "light"
                            ? location.pathname === "/login"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-800"
                            : location.pathname === "/login"
                            ? "bg-slate-700 text-slate-200"
                            : "dark:text-gray-300 dark:hover:text-white"
                        }`}
                      >
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className={`rounded-md px-3 py-2 text-sm font-medium ${
                          theme === "light"
                            ? location.pathname === "/signup"
                              ? "bg-blue-500 text-white"
                              : "bg-blue-100 text-blue-400 hover:bg-blue-200 hover:text-blue-800"
                            : location.pathname === "/signup"
                            ? "bg-slate-700 text-slate-200"
                            : "dark:text-gray-300 dark:hover:text-white"
                        }`}
                      >
                        Signup
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      <div className="app-contents min-h-screen p-4 bg-slate-50 dark:bg-slate-950">
        <Routes>
          <Route path="/" element={<ShowTodoList />} />
          <Route path="/create-todo" element={<CreateTodo />} />
          <Route path="/calendar" element={<TodoCalendar />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setUserName={setUserName} />} />
          <Route path="/signup" element={<SignupPage />} />
        </Routes>
      </div>
    </div>
  );
}

function MainApp() {
  const [theme, setTheme] = useState("light");

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  return (
    <BrowserRouter>
      <ThemeProvider value={{ theme, toggleTheme }}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default MainApp;
