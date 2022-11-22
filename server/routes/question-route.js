const express = require('express');
const route = express.Router()
const questionController = require('../controller/question-controller');

route.post('/v1/question/create', questionController.create);
route.get('/v1/questions', questionController.find);
route.get('/v1/question/:quizId', questionController.findById);
route.put('/v1/question/answer/:questionId', questionController.addAnswersByQuestionId);


module.exports = route