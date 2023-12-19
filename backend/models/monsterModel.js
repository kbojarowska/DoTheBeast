const mongoose = require('mongoose');

const monsterSchema = new mongoose.Schema({
    monsterID: {
        type: Number,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    minPoints: {
        type: Number,
        required: true,
    },
    maxPoints: {
        type: Number,
        required: true,
    },
});

module.exports = mongoose.model('Monster', monsterSchema);