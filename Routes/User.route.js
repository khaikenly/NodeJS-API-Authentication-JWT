const express = require('express');
const route = express.Router();

const usersController = require('../controller/UsersController');
const {verifyToken} = require('../middleware/auth');

route.post('/register',usersController.register);

route.post('/refresh-token',usersController.refreshToken);

route.post('/login',usersController.login);

route.delete('/logout',usersController.logout);

route.get('/getlists',verifyToken,usersController.getlists);
    
module.exports = route;