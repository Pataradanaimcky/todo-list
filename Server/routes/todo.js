const express = require("express");
const router = express.Router();

const {
  getAllTodo,
  postCreateTodo,
  putUpdateTodo,
  deleteTodo,
} = require("../controllers/todo");

/**
 * @route GET api/todo
 * @description Get all todos
 * @access Public
 */
router.get("/", getAllTodo);

/**
 * @route POST api/todo
 * @description Create a new todo
 * @access Public
 */
router.post("/", postCreateTodo);

/**
 * @route PUT api/todo/:id
 * @description Update a todo
 * @access Public
 */
router.put("/:id", putUpdateTodo);

/**
 * @route DELETE api/todo/:id
 * @description Delete a todo
 * @access Public
 */
router.delete("/:id", deleteTodo);

module.exports = router;
