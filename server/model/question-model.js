const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    question: {
        type: String,
        required: true
    },

    answers: { type: [mongoose.Schema.Types.ObjectId], ref: 'Answer' },

    image: {

        type: String,
        required: false,

    },

})

const Question = new mongoose.model('Question', schema);

module.exports = Question;