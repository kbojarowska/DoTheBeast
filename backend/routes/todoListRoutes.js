const express = require('express');
const router = express.Router();

const {
  getAllTodoLists,
  getTodoListById,
  createTodoList,
  updateTodoList,
  deleteTodoList,
} = require('../controllers/todoListController');

// Get all todoLists
router.get('/', getAllTodoLists);

// Get a specific todoList by ID
router.get('/:id', getTodoListById);

// Create a new todoList
router.post('/', createTodoList);

// Edit todoList
router.patch('/:id', updateTodoList);

// Delete a specific todoList
router.delete('/:id', deleteTodoList);

module.exports = router;
