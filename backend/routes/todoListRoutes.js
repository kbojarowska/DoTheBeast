const express = require('express');
const router = express.Router();

const {
  getAllTodoLists,
  getTodoListById,
  createTodoList,
  updateTodoListName,
  updateTodoListUsers,
  deleteTodoList,
} = require('../controllers/todoListController');

// Get all todoLists
router.get('/', getAllTodoLists);

// Get a specific todoList by ID
router.get('/:id', getTodoListById);

// Create a new todoList
router.post('/', createTodoList);

// Edit name of the todoList
router.put('/name/:id', updateTodoListName);

// Edit user list of the todoList
router.put('/users/:id', updateTodoListUsers);

// Delete a specific todoList
router.delete('/:id', deleteTodoList);

module.exports = router;
