const jwt = require('jsonwebtoken');
const createError = require('http-errors')
const client = require('../helpers/connections_redis');

const verifyToken = (req, res, next) => {
    const authHeader = req.header('Authorization');
    const token = authHeader && authHeader.split(' ')[1];
    
    if (!token) res.sendStatus(401);

    try {
        jwt.verify(token,process.env.SECRET_KEY_ACCESS_TOKEN,);
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return next(createError.Unauthorized());
            
        }else{
            return next(createError.Unauthorized(error.message));
        }
    }
}

const checkRefreshTokenRedis = async (key, refreshToken)=>{
    return await client.get(key);
}

const verifyRefreshToken = async (refreshToken)=>{
    return new Promise((resolve, reject)=>{
        jwt.verify(refreshToken, process.env.SECRET_KEY_REFRESH_TOKEN, (err, payload)=>{
            if (err) {
                return reject(err);
            }
            (async ()=>{
                const reply = await client.get(payload.userId);
                if (refreshToken === reply) {
                    return resolve(payload)
                }
                return reject(createError.Unauthorized())
            })();
        })
    });
}

module.exports = {verifyToken, verifyRefreshToken};