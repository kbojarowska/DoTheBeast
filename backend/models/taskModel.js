const mongoose = require('mongoose');

// TODO: update this schema to contain essential properties
const taskSchema = new mongoose.Schema({
    taskName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Task', taskSchema);