const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isShared: {
    type: Boolean,
    required: true,
  },
  tasks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Task',
    },
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
});

module.exports = mongoose.model('TodoList', todoListSchema);
