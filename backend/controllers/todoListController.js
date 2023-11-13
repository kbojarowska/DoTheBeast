const TodoList = require('../models/todoListModel');
const User = require('../models/userModel');

const getAllTodoLists = async (req, res) => {
  try {
    const todoLists = await TodoList.find();
    res.json(todoLists);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

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

const createTodoList = async (req, res) => {
  const { name, isShared, userId } = req.body;
  try {
    const todoList = new TodoList({
      name,
      isShared,
      // Users list initionally includes only id of user that created it
      users: [userId],
      // Task list is intionally empty
      tasks: [],
    });

    const newTodoList = await todoList.save();

    // Get the user who created the list and add the list to their todoLists
    const listCreator = await User.findById(userId);
    listCreator.todoLists.push(newTodoList._id);
    await listCreator.save();

    res.status(201).json(newTodoList);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const updateTodoList = async (req, res) => {
  // ...
};

const deleteTodoList = async (req, res) => {
  // ...
};

module.exports = {
  getAllTodoLists,
  getTodoListById,
  createTodoList,
  // updateTodoList,
  // deleteTodoList
};
