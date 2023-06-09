const Todo = require("../models/todo");
const jwt = require('jsonwebtoken');

exports.getAllTodo = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Todo.find({ userId: decoded._id })
      .then((todos) => res.json(todos))
      .catch((err) =>
        res.status(500).json({ message: "Internal Server Error", error: err.message })
      );
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.postCreateTodo = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { title, description, priority, dateAdded, status } = req.body;

    const newTodo = new Todo({
      title,
      description,
      priority,
      dateAdded,
      status,
      userId: decoded._id,
    });

    newTodo
      .save()
      .then((data) => res.json({ message: "Todo added successfully", data }))
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message })
      );
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.putUpdateTodo = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const { title, description, priority, dateAdded, status } = req.body;

    Todo.findOneAndUpdate(
      { _id: req.params.id, userId: decoded._id },
      { title, description, priority, dateAdded, status },
      { new: true }
    )
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: "Todo not found for the authenticated user",
          });
        }
        res.json({ message: "Updated successfully", data });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message })
      );
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};

exports.deleteTodo = (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    Todo.findOneAndDelete({ _id: req.params.id, userId: decoded._id })
      .then((data) => {
        if (!data) {
          return res.status(404).json({
            message: "Todo not found for the authenticated user",
          });
        }
        res.json({ message: "Todo deleted successfully", data });
      })
      .catch((err) =>
        res
          .status(500)
          .json({ message: "Internal Server Error", error: err.message })
      );
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
