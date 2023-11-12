const mongoose = require('mongoose');

// TODO: update this schema to contain essential properties
const trophySchema = new mongoose.Schema({
    trophyName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Trophy', trophySchema);