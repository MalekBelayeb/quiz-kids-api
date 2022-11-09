const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    quiz: {
        type : String,
        required: true
    },
    category: {
        type : String,
        required: true
    },
    answer1 : {
        type : String,
        required: true
    },
    answer2 : {
        type : String,
        required: true
    },
    answer3 : {
        type : String,
        required: true
    },
    answer4 : {
        type : String,
        required: true
    },
 
    image : {
        
        type : String,
        required: true,
    },
 
})
const quizdb = new mongoose.model('Quiz', schema);

module.exports = quizdb;

