require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();

// routes
const todoRoutes = require("./routes/todo");
const loginsignupRoutes = require("./routes/login.signup")

// connect database
connectDB();

// cors
app.use(cors({ origin: true, credentials: true }));

// initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// use routes
app.use("/api/todo", todoRoutes);
app.use("/api/auth", loginsignupRoutes);

// setting up port
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
