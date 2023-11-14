const Task = require('../models/taskModel');

/**
 * @openapi
 * /tasks/:
 *   get:
 *     summary: Get all tasks.
 *     tags:
 *       - Todo Lists
 *     responses:
 *       200:
 *         description: List of tasks retrieved successfully.
 *       500:
 *         description: Server error.
 */
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /tasks/{id}:
 *   get:
 *     summary: Get a specific task by ID.
 *     tags:
 *       - Todo Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to retrieve.
 *     responses:
 *       200:
 *         description: Task retrieved successfully.
 *       404:
 *         description: Invalid request - todo list with given id does not exist.
 *       500:
 *         description: Server error.
 */
const getTaskById = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ message: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   createTask: async (req, res) => {
//     // ...
//   },

//   updateTask: async (req, res) => {
//     // ...
//   },

//   deleteTask: async (req, res) => {
//     // ...
//   },

module.exports = {
  getAllTasks,
  getTaskById,
};
