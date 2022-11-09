const express = require('express');
const route = express.Router()

const services = require('../services/render');
const controller = require('../controller/controller');
const quizcontroller = require('../controller/quizcontroller');
const {fileUpload} = require('../middleware/upload');



/**
 *  @description Root Route
 *  @method GET /
 */
route.get('/', services.homeRoutes);

/**
 *  @description add users
 *  @method GET /add-user
 */
route.get('/add-user', services.add_user)

/**
 *  @description for update user
 *  @method GET /update-user
 */
route.get('/update-user', services.update_user)




/**
 *  @description Root Route
 *  @method GET /
 */
 route.get('/', services.homeRoutes);

 /**
  *  @description add quiz
  *  @method GET /add-quiz
  */
 route.get('/add-quiz', services.add_quiz)
 
 /**
  *  @description for update quiz
  *  @method GET /update-quiz
  */
 route.get('/update-quiz', services.update_quiz)

 
// API
route.post('/api/users', fileUpload, controller.create);
route.post('/api/users/login', controller.login)
route.get('/api/users', controller.find);
route.get('/api/user/:id', controller.findById);

route.put('/api/users/:id', controller.update);
route.delete('/api/users/:id', controller.delete);

route.post('/api/quiz',fileUpload, quizcontroller.create);
route.get('/api/quiz', quizcontroller.find);
route.get('/api/quiz/:id', quizcontroller.findById);

route.put('/api/quiz/:id',quizcontroller.update);
route.delete('/api/quiz/:id', quizcontroller.delete);



module.exports = route