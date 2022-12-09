const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    name: {

        type: String,
        required: true

    },
    description: {

        type: String,
        required: true

    },
    difficulty: {

        type: String,
        required: true

    },
    questions: {

        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Question',
        required: true

    },
    category: {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true

    },
    image: {

        type: String,
        required: false,

    },

})

const Quiz = new mongoose.model('Quiz', schema);
module.exports = Quiz;