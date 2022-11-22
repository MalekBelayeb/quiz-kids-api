const express = require('express');
const route = express.Router()

const answerController = require('../controller/answer-controller');

route.post('/v1/answer/create', answerController.create);

route.get('/v1/answers', answerController.find);

module.exports = route