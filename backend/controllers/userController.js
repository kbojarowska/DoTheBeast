const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/userModel');

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

module.exports = {
  registerUser,
  loginUser,
};
