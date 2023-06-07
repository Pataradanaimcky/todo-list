const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "low",
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["working", "completed"],
    default: "working",
  },
});

const Todo = mongoose.model("Todo", TodoSchema);

module.exports = Todo;
