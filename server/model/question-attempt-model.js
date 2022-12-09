const mongoose = require('mongoose');

var schema = new mongoose.Schema({


    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
        required: true

    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

    userAnswer: { type: mongoose.Schema.Types.ObjectId, ref: 'Answer' },

})

const Question = new mongoose.model('QuestionAttempt', schema);

module.exports = Question;