const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstname : {
        type : String,
        required: true
    },
    lastname : {
        type : String,
        required: true
    },
    email : {
        type: String,
        required: true,
        unique: true
    },
    profileimage : {
        type : String,
        required: false,
    },
    password: String,
    status : String,
    score : Number,
    trophe: String
})
const Userdb = mongoose.model('User', schema);

module.exports = Userdb;


