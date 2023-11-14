const express = require('express');
const router = express.Router();

const {
  getAllTasks,
  getTaskById,
  // createTask,
  // updateTask,
  // deleteTask,
} = require('../controllers/taskController');

// Get all tasks
router.get('/', getAllTasks);

// Get a specific task by ID
router.get('/:id', getTaskById);

// // Create a new task
// router.post('/', createTask);

// // Edit task
// router.put('/:id', updateTask);

// // Delete a specific task
// router.delete('/:id', deleteTask);

module.exports = router;
