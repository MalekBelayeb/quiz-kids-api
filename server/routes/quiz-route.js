const express = require('express');
const route = express.Router()
const quizController = require('../controller/quiz-controller');
const {fileUpload} = require('../middleware/upload');



route.post('/v1/quiz/create',fileUpload, quizController.create);
route.get('/v1/quiz', quizController.find);
route.get('/v1/quiz/:id', quizController.findById);

route.put('/v1/quiz/:id',quizController.update);
route.delete('/v1/quiz/:id', quizController.delete);


module.exports = route