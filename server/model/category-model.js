const mongoose = require('mongoose');

var schema = new mongoose.Schema({

    category: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    requiredPoints: {
        type: Number,
        required: true,
    }
})


const Category = new mongoose.model('Category', schema);

module.exports = Category;