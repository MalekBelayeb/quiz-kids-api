const mongoose = require('mongoose');

var schema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    profileimage: {
        type: String,
        required: false,
    },
    globalScore: {
        type: Number,
        default: 0,
    },
    badges: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Badge',
        default: 0,
    },
    password: String,
    status: String,

})

const User = mongoose.model('User', schema);

module.exports = User;