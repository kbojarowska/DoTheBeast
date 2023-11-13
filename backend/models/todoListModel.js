const mongoose = require('mongoose');

const todoListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  // We haven't decided how creating a shared to-do list should look like. My suggestion is to create a popup like "Do you want to share this to-do list with others?"
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
