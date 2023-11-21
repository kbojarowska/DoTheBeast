const bcrypt = require('bcryptjs');

const User = require('../models/userModel');
const generateToken = require('../utils/generateToken');

/**
 * @openapi
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         username:
 *           type: string
 *           description: The username of the user.
 *           example: john_doe
 *         password:
 *           type: string
 *           description: The password of the user.
 *           example: mySecurePassword
 *         hairID:
 *           type: number
 *           description: The ID of the user's selected hair.
 *           example: 1
 *         outfitTopID:
 *           type: number
 *           description: The ID of the user's selected top outfit.
 *           example: 3
 *         outfitBottomID:
 *           type: number
 *           description: The ID of the user's selected bottom outfit.
 *           example: 5
 *         tasks:
 *           type: array
 *           description: An array of Task IDs associated with the user.
 *           items:
 *             type: string
 *             format: uuid
 *         monster:
 *           type: array
 *           description: An array of Monster IDs associated with the user.
 *           items:
 *             type: string
 *             format: uuid
 *         friends:
 *           type: array
 *           description: An array of User IDs representing the user's friends.
 *           items:
 *             type: string
 *             format: uuid
 */

/**
 * @openapi
 * /users/register:
 *   post:
 *     summary: Register a new user.
 *     description: Registers a new user and returns user information along with an authentication token.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *               passwordConfirmation:
 *                 type: string
 *               hairID:
 *                 type: integer
 *               outfitTopID:
 *                 type: integer
 *               outfitBottomID:
 *                 type: integer
 *     responses:
 *       201:
 *         description: User account created successfully. Returns user data and a JSON Web Token (JWT)
 *       400:
 *         description: An error occurred. Possible reasons include password mismatch, user already exists, or invalid user data.
 */
const registerUser = async (req, res) => {
  try {
    const {
      username,
      password,
      passwordConfirmation,
      hairID,
      outfitTopID,
      outfitBottomID,
    } = req.body;

    if (password !== passwordConfirmation) {
      res.status(400).json({ message: 'Passwords not match!' });
    }
    const userExists = await User.findOne({ username });
    if (userExists) {
      res.status(400).json({ message: `User ${username} already exists` });
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
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /users/login:
 *   post:
 *     summary: Login a user.
 *     description: Logins a registered user and returns user information along with an authentication token.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: User logged in successfully. Returns user data and a JSON Web Token (JWT).
 *       401:
 *         description: Invalid credentials (incorrect username or password).
 */
const loginUser = async (req, res) => {
  try {
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
      res.status(401).json({ message: 'Invalid credentials' });;
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /users:
 *   get:
 *     summary: Get all users.
 *     description: Retrieve a list of all registered users.
 *     tags: 
 *       - Users
 *     responses:
 *       200:
 *         description: List of users retrieved successfully.
 *       500:
 *         description: Server error.
 */
const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * @openapi
 * /users/{id}:
 *   get:
 *     summary: Get a specific user by ID.
 *     description: Retrieve user details by their unique ID.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve.
 *     responses:
 *       200:
 *         description: User details retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @openapi
 * /users/{id}:
 *   patch:
 *     summary: Update user details by ID.
 *     description: Partially update the specified user's details based on their unique identifier.
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The unique identifier of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The new username for the user.
 *               password:
 *                 type: string
 *                 description: The new password for the user.
 *               hairID:
 *                 type: integer
 *                 description: The new identifier for the user's hairstyle.
 *               outfitTopID:
 *                 type: integer
 *                 description: The new identifier for the user's top outfit.
 *               outfitBottomID:
 *                 type: integer
 *                 description: The new identifier for the user's bottom outfit.
 *     responses:
 *       200:
 *         description: User details updated successfully.
 *       404:
 *         description: User not found.
 *       400:
 *         description: Bad request - Invalid user data.
 */

const updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      const { username, password, hairID, outfitTopID, outfitBottomID } = req.body;

      user.username = username || user.username;
      user.password = password ? await bcrypt.hash(password, await bcrypt.genSalt(10)) : user.password;
      user.hairID = hairID || user.hairID;
      user.outfitTopID = outfitTopID || user.outfitTopID;
      user.outfitBottomID = outfitBottomID || user.outfitBottomID;

      await user.save();
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};



/**
 * @openapi
 * /users/{id}:
 *   delete:
 *     summary: Delete a user by ID.
 *     description: Delete a user by their ID and remove them from friends' lists.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to delete.
 *     responses:
 *       200:
 *         description: User deleted successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
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



/**
 * @openapi
 * /users/addFriend:
 *   post:
 *     summary: Add a friend to a user.
 *     description: Adds a friend to a specific user's friend list.
 *     tags: 
 *       - Users
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               friendId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend added successfully.
 *       400:
 *         description: User is already friends with this user.
 *       404:
 *         description: User or friend not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @openapi
 * /users/{userId}/friends:
 *   get:
 *     summary: Get a specific user's friends.
 *     description: Retrieve a list of friends for a specific user.
 *     tags: 
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: The ID of the user to retrieve friends for.
 *     responses:
 *       200:
 *         description: List of friends retrieved successfully.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
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

/**
 * @openapi
 * /users/friends/removeFriend:
 *   delete:
 *     summary: Remove a friend from a user.
 *     description: Remove a specific friend from the user's friend list.
 *     tags: 
 *       - Users
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: string
 *               friendId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Friend removed successfully.
 *       400:
 *         description: Friend not found in the user's list.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Server error.
 */
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
