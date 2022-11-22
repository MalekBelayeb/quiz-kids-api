const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    answer: {
        type: String,
        required: true
    },

    score: {
        type: Number,
        default: 0
    },

    isCorrect: {
        type: Boolean,
        default: false
    }

})

const Answer = new mongoose.model('Answer', schema);

module.exports = Answer;