import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../image/draw2.webp";
import axios from "axios";

export function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    // Create an object with the form data
    const formData = {
      email,
      password,
    };

    // Send the form data to the server
    try {
      const response = await axios.post("http://localhost:4000/api/auth/login", formData);
      const data = response.data;

      if (response.status === 200) {
        // Successful login
        // Store the token securely in local storage
        localStorage.setItem("token", data.token);
        setIsLoggedIn(true);
        navigate("/", { replace: true });
      } else {
        // Error occurred
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);


  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl w-full mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-md mt-8">
        <div className="flex flex-col sm:flex-row items-center justify-center mb-4">
          <div className="w-full sm:w-1/3 mb-4 sm:mb-0">
            <img
              src={logo}
              alt="Logo"
              className="h-auto max-w-full object-contain"
              style={{ maxWidth: "100%" }}
            />
          </div>
          <div className="border-r mx-4"></div>
          <div className="w-full sm:w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
              Login
            </h2>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4 text-center">
                {errorMessage}
              </p>
            )}
            <form onSubmit={handleFormSubmit}>
              <label className="block mb-2 text-gray-800 dark:text-white">
                Email:
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input mt-1 block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
              />
              <label className="block mb-2 text-gray-800 dark:text-white">
                Password:
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input mt-1 block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2 w-full hover:bg-blue-600 mt-4"
              >
                Login
              </button>
            </form>
            <p className="mt-4 text-center text-gray-800 dark:text-white">
              Don't have an account?{" "}
              <button
                onClick={() => navigate("/signup")}
                className="text-blue-500 underline"
              >
                Signup
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
