import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../image/draw2.svg";

export function SignupPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [signupSuccess, setSignupSuccess] = useState(false); // New state variable

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = {
      email,
      password,
      name,
      surname,
    };

    try {
      const response = await fetch("http://localhost:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSignupSuccess(true); // Set signup success state

      } else {
        setErrorMessage(data.message);
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-slate-50 dark:bg-slate-950">
        <div className="max-w-3xl w-full mx-auto p-8 bg-white dark:bg-gray-800 shadow-md rounded-lg mt-8">
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
            <div className="w-2/3">
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4 text-center">
                Signup
            </h2>
            {errorMessage && (
                <p className="text-red-500 text-sm mb-4 text-center">
                {errorMessage}
                </p>
            )}
            {signupSuccess && (
                <p className="text-green-500 text-sm mb-4 text-center">
                Signup successful! Please login to continue.
                </p>
            )}
            <form onSubmit={handleFormSubmit}>
                <label className="block text-gray-800 dark:text-white">
                Name:
                </label>
                <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="form-input mb-3 block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                />
                <label className="block text-gray-800 dark:text-white">
                Surname:
                </label>
                <input
                type="text"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
                required
                className="form-input block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                />
                <label className="mt-3 block text-gray-800 dark:text-white">
                Email:
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                />
                <label className="mt-3 block text-gray-800 dark:text-white">
                Password:
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input block w-full border border-gray-300 shadow-sm dark:bg-gray-700 dark:text-white"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white rounded px-4 py-2 w-full hover:bg-blue-600 mt-4"
                >
                Signup
                </button>
            </form>
            <p className="mt-4 text-center text-gray-800 dark:text-white">
                Already have an account?{" "}
                <Link to="/login" className="text-blue-500 underline">
                Login
                </Link>
            </p>
            </div>
        </div>
        </div>
    </div>
  );
}
