const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },
    scoreCriteria: {
        type: Number,
        required: true
    },
    image: {
        type: String,
        required: true
    },
})

const Badge = new mongoose.model('Badge', schema);
module.exports = Badge;