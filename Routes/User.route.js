const express = require('express');
const route = express.Router();

route.post('/register',(req, res, next)=>{
    res.send('register');
});

route.post('/refresh-token',(req, res, next)=>{
    res.send('refresh-token');
});

route.post('/login',(req, res, next)=>{
    res.send('login');
});

route.post('/logout',(req, res, next)=>{
    res.send('logout');
});

module.exports = route;