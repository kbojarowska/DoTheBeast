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
  },
  // totalCompletedTodoLists: {
  //   type: Number,
  //   default: 0,
  // },
  // totalCompletedTasks: {
  //   type: Number,
  //   default: 0,
  // },
  totalFriends: {
    type: Number,
    default: 0,
  },
  totalTodoLists: {
    type: Number,
    default: 0,
  },
  totalTasks: {
    type: Number,
    default: 0,
  },
  totalSharedLists: {
    type: Number,
    default: 0,
  },
  // totalMonsters: {
  //   type: Number,
  //   default: 0,
  // },
});

module.exports = mongoose.model('User', userSchema);
