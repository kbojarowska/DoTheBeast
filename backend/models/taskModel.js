const mongoose = require('mongoose');

// TODO: update this schema to contain essential properties
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  todoListId: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoList' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
