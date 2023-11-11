const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

// Register
const registerUser = async (req, res) => {
  const {
    username,
    password,
    passwordConfirmation,
    hairID,
    outfitTopID,
    outfitBottomID,
  } = req.body;

  if (password !== passwordConfirmation) {
    res.status(400);
    throw new Error('Passwords not match!');
  }
  const userExists = await User.findOne({ username });
  if (userExists) {
    res.status(400);
    throw new Error(`User ${username} already exists`);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user = await User.create({
    username,
    password: hashedPassword,
    hairID,
    outfitTopID,
    outfitBottomID,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      hairID: user.hairID,
      outfitTopID: user.outfitTopID,
      outfitBottomID: user.outfitBottomID,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};

// Login
const loginUser = async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });

  if (user && (await bcrypt.compare(password, user.password))) {
    res.status(200).json({
      _id: user._id,
      username: user.username,
      hairID: user.hairID,
      outfitTopID: user.outfitTopID,
      outfitBottomID: user.outfitBottomID,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Invalid credentials');
  }
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get user by Id
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update user by ID
const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { username, password, hairID, outfitTopID, outfitBottomID } = req.body;
      user.username = username;
      user.password = password;
      user.hairID = hairID;
      user.outfitTopID = outfitTopID;
      user.outfitBottomID = outfitBottomID;

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Delete user by ID
const deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await User.findById(userId).populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const usersWithCurrentUserAsFriend = await User.find({ friends: userId });
    const removeFromFriendLists = usersWithCurrentUserAsFriend.map(async (friendUser) => {
      friendUser.friends = friendUser.friends.filter(friend => friend.toString() !== userId);
      await friendUser.save();
    });

    await Promise.all(removeFromFriendLists);
    await User.deleteOne({ _id: userId });

    res.json({ message: 'User deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



// Add a friend
const addFriend = async (req, res) => {
  const { userId, friendId } = req.body;

  try {
    const user = await User.findById(userId);
    const friend = await User.findById(friendId);

    if (!user || !friend) {
      res.status(404).json({ message: 'User or friend not found' });
      return;
    }

    if (user.friends.includes(friendId)) {
      res.status(400).json({ message: 'User is already friends with this user' });
      return;
    }

    user.friends.push(friendId);
    await user.save();

    res.json({ message: 'Friend added successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a user's friends
const getFriends = async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId).populate('friends', 'username');
    
    if (!user) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    res.json(user.friends);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Remove a friend from a user
const removeFriend = async (req, res) => {
  const { userId, friendId } = req.body;
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const stringFriendId = friendId.toString();

    if (!user.friends.map(friend => friend.toString()).includes(stringFriendId)) {
      return res.status(400).json({ message: 'Friend not found in the user\'s list' });
    }

    user.friends = user.friends.filter(friend => friend.toString() !== stringFriendId);
    await user.save();
    
    res.json({ message: 'Friend removed successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  registerUser,
  loginUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  addFriend,
  getFriends,
  removeFriend,
};
