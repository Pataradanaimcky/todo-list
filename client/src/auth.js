import argon2 from "argon2";
import jwtDecode from "jwt-decode";
import api from "./src/api";

// Function to hash the password using argon2
export async function hashPassword(password) {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
    throw new Error("Failed to hash password");
  }
}

// Function to register a new user
export async function registerUser(email, password) {
  try {
    const hashedPassword = await hashPassword(password);

    const response = await api.post("/signup", {
      email,
      password: hashedPassword,
    });

    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    throw new Error("Failed to register user");
  }
}

// Function to log in a user and retrieve the JWT token
export async function loginUser(email, password) {
  try {
    const response = await api.post("/login", {
      email,
      password,
    });

    const token = response.data.token;
    setAuthToken(token);

    return token;
  } catch (error) {
    console.error("Error logging in user:", error);
    throw new Error("Failed to log in user");
  }
}

// Function to set the JWT token in the request headers
export function setAuthToken(token) {
  if (token) {
    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  } else {
    delete api.defaults.headers.common["Authorization"];
  }
}

// Function to check if the user is authenticated
export function isAuthenticated() {
  const token = localStorage.getItem("token");

  if (token) {
    const decodedToken = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    return decodedToken.exp > currentTime;
  }

  return false;
}
