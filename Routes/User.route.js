const express = require('express');
const createError = require('http-errors');
const route = express.Router();

const User = require('../Models/User.model');
const { userValidate } = require('../helpers/Validation');

route.post('/register', async (req, res, next) => {
    try {
        const { email, password } = req.body;
        const { error } = userValidate(req.body);
        console.log(error);
        if (error) {
            throw createError(error.details[0].message);
        }

        const IsExist = await User.findOne({ username: email }).exec();
        if (IsExist) {
            throw createError.Conflict(`${email} is already been register!!!`);
        }

        const isCreate = await User.create({
            username: email,
            password: password
        });

        return res.json({
            status: 200,
            elements: isCreate
        });

    } catch (error) {
        next(error);
    }
});

route.post('/refresh-token', (req, res, next) => {
    res.send('refresh-token');
});

route.post('/login', (req, res, next) => {
    res.send('login');
});

route.post('/logout', (req, res, next) => {
    res.send('logout');
});

module.exports = route;