const express = require('express');
const route = express.Router()
const userController = require('../controller/user-controller');
const {fileUpload} = require('../middleware/upload');

route.post('/v1/users', userController.create);
route.post('/v1/users/login', userController.login)
route.get('/v1/users', userController.find);
route.get('/v1/user/:id', userController.findById);

route.put('/v1/users/:id', userController.update);
route.delete('/v1/users/:id', userController.delete);

module.exports = route