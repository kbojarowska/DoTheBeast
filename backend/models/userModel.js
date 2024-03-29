const mongoose = require('mongoose');

// TODO: We have to code functions for completing todolists and tasks
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
  hairId: {
    type: Number,
    required: true,
  },
  fitId: {
    type: Number,
    required: true,
  },
  bodyId: {
    type: Number,
    required: true,
  },
  todoLists: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'TodoList',
    },
  ],
  monster: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Monster'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  registrationDate: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('User', userSchema);
