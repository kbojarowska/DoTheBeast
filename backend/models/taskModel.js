const mongoose = require('mongoose');

// TODO: update this schema to contain essential properties
const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: [
      'Work',
      'Personal',
      'Health',
      'Education',
      'Entertainment',
      'Family',
      'Errands',
      'Fitness',
      'Projects',
      'Mental well-being',
    ],
    required: true,
  },
  time: {
    type: Number,
    min: 1,
    required: true,
  },
  difficulty: {
    type: Number,
    min: 1,
    max: 5,
    required: true,
  },
  isDone: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: Number,
    required: true,
  },
  todoListId: { type: mongoose.Schema.Types.ObjectId, ref: 'TodoList' },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});

module.exports = mongoose.model('Task', taskSchema);
