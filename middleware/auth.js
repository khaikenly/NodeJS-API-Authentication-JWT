const jwt = require('jsonwebtoken');
// const createError = require('http-errors')

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) res.sendStatus(401);
    try {
        jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN,);
        next();
    } catch (error) {
        res.sendStatus(403);
    }

    // jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN, (err, payload)=>{
    //     if (err) {
    //         return next(createError.Unauthorized);
    //     }
    //     req.payload = payload;
    //     next();
    // });
}

module.exports = {verifyToken};