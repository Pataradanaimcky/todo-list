import axios from "axios";

const API_URL = "http://localhost:4000"; // Replace with your API URL

const api = axios.create({
  baseURL: API_URL,
});

export default api;
