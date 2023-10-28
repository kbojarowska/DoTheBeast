const bcrypt = require('bcryptjs');

const User = require('../models/userModel');

const registerUser = async (req, res) => {
  if (req.body.password !== req.body.passwordConfirmation) {
    res.status(400);
    throw new Error('Passwords not match!');
  }
  const userExists = await User.findOne({ username: req.body.username });
  if (userExists) {
    res.status(400);
    throw new Error(`User ${req.body.username} already exists`);
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);
  const user = await User.create({
    username: req.body.username,
    password: hashedPassword,
    hairID: req.body.hairID,
    outfitTopID: req.body.outfitTopID,
    outfitBottomID: req.body.outfitBottomID,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      hairID: user.hairID,
      outfitTopID: user.outfitTopID,
      outfitBottomID: user.outfitBottomID,
    });
  } else {
    res.status(400);
    throw new Error('Invalid user data');
  }
};
const loginUser = (req, res) => {
  res.send('Login route');
};

module.exports = {
  registerUser,
  loginUser,
};
