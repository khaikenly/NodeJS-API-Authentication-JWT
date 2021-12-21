const express = require('express');
const app = express();
const createError = require('http-errors');
const userRoute = require('./Routes/User.route');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

app.get('/',(req, res)=>{
    res.send('Home Page');
});

app.use('/user',userRoute);

//create middleware catch error -> alway last methods (get, post, ...)
app.use((req, res, next)=>{
    // const error = new Error('Not Found!');
    // error.status = 500;
    next(createError.NotFound("This route does not exist"));
});

app.use((err,req, res, next)=>{
    res.json({
        status: err.status,
        message: err.message
    })
});

app.listen(PORT,()=>{
    console.log(`Server running on http://localhost:${PORT}`);
});