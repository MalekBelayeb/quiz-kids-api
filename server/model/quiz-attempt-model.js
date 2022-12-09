const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    quiz: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz',
        required: true

    },
    user: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true

    },
    questions: {

        type: [mongoose.Schema.Types.ObjectId],
        ref: 'QuestionAttempt',
        required: true

    }

})

const Quiz = new mongoose.model('QuizAttempt', schema);
module.exports = Quiz;