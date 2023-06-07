const Todo = require("../models/todo");

exports.getAllTodo = (req, res) => {
  Todo.find()
    .then((todos) => res.json(todos))
    .catch((err) =>
      res.status(404).json({ message: "Todo not found", error: err.message })
    );
};

exports.postCreateTodo = (req, res) => {
    const { title, description, priority, dateAdded, status } = req.body;
  
    const newTodo = new Todo({
      title,
      description,
      priority,
      dateAdded,
      status,
    });
  
    newTodo
      .save()
      .then((data) =>
        res.json({ message: "Todo added successfully", data })
      )
      .catch((err) =>
        res
          .status(400)
          .json({ message: "Failed to add todo", error: err.message })
      );
  };
  

exports.putUpdateTodo = (req, res) => {
  const { title, description, priority, dateAdded, status } = req.body;

  Todo.findByIdAndUpdate(
    req.params.id,
    { title, description, priority, dateAdded, status },
    { new: true }
  )
    .then((data) =>
      res.json({ message: "Updated successfully", data })
    )
    .catch((err) =>
      res
        .status(400)
        .json({ message: "Failed to update todo", error: err.message })
    );
};

exports.deleteTodo = (req, res) => {
  Todo.findByIdAndRemove(req.params.id)
    .then((data) =>
      res.json({ message: "Todo deleted successfully", data })
    )
    .catch((err) =>
      res
        .status(404)
        .json({ message: "Todo not found", error: err.message })
    );
};
