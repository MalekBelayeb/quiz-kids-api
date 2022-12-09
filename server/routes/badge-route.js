const express = require('express');
const route = express.Router()

const badgeController = require('../controller/badge-controller');
const { fileUpload } = require('../middleware/upload');

route.post('/v1/badge/create', fileUpload, badgeController.create);
route.get('/v1/badge/get', badgeController.find);

module.exports = route