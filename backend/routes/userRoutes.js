const express = require('express');
const router = express.Router();
const {
  registerUser,
  loginUser,
  getUsers,
  getUsersByUsername,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  removeFriend,
} = require('../controllers/userController');

// Register a new user
router.post('/register', registerUser);

// Login a user
router.post('/login', loginUser);

// Get all users
router.get('/', getUsers);

// Get users by username
router.get('/search/:query', getUsersByUsername);

// Get a specific user by ID
router.get('/:id', getUserById);

// Update user by ID
router.patch('/:id', updateUser);

// Delete a user by ID
router.delete('/:id', deleteUser);

// Add a friend to a user
router.post('/addFriend', addFriend);

// Get a user's friends
router.get('/:userId/friends', getFriends);

// Remove a friend from a user
router.delete('/friends/removeFriend', removeFriend);

module.exports = router;
