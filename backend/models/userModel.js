const mongoose = require('mongoose');

// This model includes only essential user registration data. We need to collectively determine what user data needs to be stored and then update this model accordingly.
const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Please add a username'],
    unique: true,
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
  },
  hairID: {
    type: Number,
    required: true,
  },
  outfitTopID: {
    type: Number,
    required: true,
  },
  outfitBottomID: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('User', userSchema);
