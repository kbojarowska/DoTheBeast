const Task = require('../models/taskModel');
const TodoList = require('../models/todoListModel');

/**
 * @openapi
 * /tasks/:
 *   get:
 *     summary: Get all tasks.
 *     tags:
 *       - Tasks
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
 *       - Tasks
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

/**
 * @openapi
 * /tasks/:
 *   post:
 *     summary: Create a new task
 *     tags:
 *       - Tasks
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               todoListId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Task created successfully.
 *       500:
 *         description: Server error.
 */
const createTask = async (req, res) => {
  const { name, todoListId, userId } = req.body;
  try {
    const task = new Task({
      name,
      // Task is intionally undone
      isDone: false,
      todoListId,
      userId,
    });

    const newTask = await task.save();

    // Add the task to the tasks in the appropriate todoList
    const todoList = await TodoList.findById(todoListId);
    todoList.tasks.push(newTask._id);
    await todoList.save();

    res.status(201).json(newTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /tasks/{id}:
 *   put:
 *     summary: Update a task
 *     description: Updates one or more properties of a task, but does not allow it to be moved to other task lists.
 *     tags:
 *       - Tasks
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the task to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             oneOf:
 *               - properties:
 *                   name:
 *                     type: string
 *               - properties:
 *                   isDone:
 *                     type: boolean
 *               - properties:
 *                   userId:
 *                     type: string
 *     responses:
 *       200:
 *         description: Task updated successfully.
 *       404:
 *         description: Task not found.
 *       500:
 *         description: Server error.
 */
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    const updatedTaskData = {
      ...req.body,
      todoListId: task.todoListId, // Keep original todoListId
    };

    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      updatedTaskData,
      {
        new: true,
      }
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//   deleteTask: async (req, res) => {
//     // ...
//   },

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
};
