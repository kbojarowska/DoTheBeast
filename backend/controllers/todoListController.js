const TodoList = require('../models/todoListModel');
const User = require('../models/userModel');

/**
 * @openapi
 * /todoLists/:
 *   get:
 *     summary: Get all todo lists.
 *     tags:
 *       - Todo Lists
 *     responses:
 *       200:
 *         description: List of todo lists retrieved successfully.
 *       500:
 *         description: Server error.
 */
const getAllTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find();
    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /todoLists/{id}:
 *   get:
 *     summary: Get a specific todo list by ID.
 *     tags:
 *       - Todo Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list to retrieve.
 *     responses:
 *       200:
 *         description: Todo list retrieved successfully.
 *       404:
 *         description: Invalid request - todo list with given id does not exist.
 *       500:
 *         description: Server error.
 */
const getTodoListById = async (req, res) => {
  try {
    const todoList = await TodoList.findById(req.params.id);
    if (todoList) {
      res.json(todoList);
    } else {
      res.status(404).json({ message: 'Todo list not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /todoLists/:
 *   post:
 *     summary: Create a new todo list.
 *     tags:
 *       - Todo Lists
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               isShared:
 *                 type: boolean
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Todo list created successfully.
 *       500:
 *         description: Server error.
 */
const createTodoList = async (req, res) => {
  const { name, isShared, users } = req.body;
  try {
    const todoList = new TodoList({
      name,
      isShared,
      users,
      // Task list is intionally empty
      tasks: [],
    });

    const newTodoList = await todoList.save();

    // Get the user who created the list and add the list to their todoLists
    await Promise.all(
      users.map(async (userId) => {
        const listCreator = await User.findById(userId);
        listCreator.todoLists.push(newTodoList._id);
        await listCreator.save();
      })
    );

    res.status(201).json(newTodoList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /todoLists/name/{id}:
 *   put:
 *     summary: Update todo list's name
 *     tags:
 *       - Todo Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Todo list's name updated successfully.
 *       404:
 *         description: Invalid request - todo list with given id does not exist.
 *       500:
 *         description: Server error.
 */
const updateTodoListName = async (req, res) => {
  try {
    const listId = req.params.id;
    const { name } = req.body;

    const todoList = await TodoList.findById(listId);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    todoList.name = name;
    const updatedTodoList = await todoList.save();

    res.json(updatedTodoList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /todoLists/users/{id}:
 *   put:
 *     summary: Update todo list's users
 *     tags:
 *       - Todo Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Todo list's users updated successfully.
 *       404:
 *         description: Invalid request - todo list with given id does not exist.
 *       500:
 *         description: Server error.
 */
const updateTodoListUsers = async (req, res) => {
  try {
    const listId = req.params.id;
    const { users } = req.body;

    const todoList = await TodoList.findById(listId);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    //  Get old list of users
    const oldUserIds = todoList.users.map(String);

    // Update list
    todoList.users = users;
    const updatedTodoList = await todoList.save();

    // Get new list of users
    const newUserIds = updatedTodoList.users.map(String);

    // If user were added, add list to their todoLists
    newUserIds
      .filter((id) => !oldUserIds.includes(id))
      .forEach(async (addedUserId) => {
        const addedUser = await User.findById(addedUserId);
        if (addedUser) {
          addedUser.todoLists.push(listId);
          await addedUser.save();
        }
      });

    // If user were removed, remove list from their todoLists
    oldUserIds
      .filter((id) => !newUserIds.includes(id))
      .forEach(async (removedUserId) => {
        const removedUser = await User.findById(removedUserId);
        if (removedUser) {
          removedUser.todoLists = removedUser.todoLists.filter(
            (id) => id !== listId
          );
          await removedUser.save();
        }
      });

    res.json(updatedTodoList);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /todoLists/{id}:
 *   delete:
 *     summary: Delete a specific todo list by ID.
 *     tags:
 *       - Todo Lists
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the todo list to delete.
 *     responses:
 *       200:
 *         description: Todo list deleted successfully.
 *       404:
 *         description: Invalid request - todo list with given id does not exist.
 *       500:
 *         description: Server error.
 */
const deleteTodoList = async (req, res) => {
  try {
    const listId = req.params.id;

    const todoList = await TodoList.findById(listId);

    if (!todoList) {
      return res.status(404).json({ message: 'Todo list not found' });
    }

    // Remove list from users' todoLists
    await Promise.all(
      todoList.users.map(async (userId) => {
        const user = await User.findById(userId);
        if (user) {
          user.todoLists = user.todoLists.filter((id) => id !== listId);
          await user.save();
        }
      })
    );

    await TodoList.findByIdAndDelete(listId);

    res.json({ message: 'Todo list deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  deleteTodoList,
};

module.exports = {
  getAllTodoLists,
  getTodoListById,
  createTodoList,
  updateTodoListName,
  updateTodoListUsers,
  deleteTodoList,
};
