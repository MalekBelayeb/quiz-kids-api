const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    answer: {
        type: String,
        required: true
    },

    isCorrect: {
        type: Boolean,
        default: false
    }

})

const Answer = new mongoose.model('Answer', schema);

module.exports = Answer;