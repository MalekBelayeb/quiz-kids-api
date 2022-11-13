const express = require('express');
const route = express.Router()

const categoryController = require('../controller/category-controller');
const {fileUpload} = require('../middleware/upload');

route.post('/v1/category/create',fileUpload, categoryController.create);

route.get('/v1/category/get', categoryController.find);

module.exports = route