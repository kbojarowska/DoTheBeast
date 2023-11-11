const mongoose = require('mongoose');

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
  tasks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Task'
  }],
  trophies: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trophy'
  }],
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
});

module.exports = mongoose.model('User', userSchema);
