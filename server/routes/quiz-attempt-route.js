const express = require('express');
const route = express.Router()
const quizAttemptController = require('../controller/quiz-attempt-controller');

route.post('/v1/quizAttempt/create', quizAttemptController.addQuizAttempt);
route.get('/v1/quizAttempt/get/:user', quizAttemptController.find);
route.post('/v1/quizAttempt/answer/create', quizAttemptController.addQuestionAttemptToQuizAttempt);
route.post('/v1/quizAttempt/answer/finish', quizAttemptController.finishQuiz);

module.exports = route