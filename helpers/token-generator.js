const jwt = require('jsonwebtoken');
const client = require('../helpers/connections_redis');
const createError = require('http-errors')

const signAccessToken = async (userId)=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            userId
        }

        const secret = process.env.SECRET_KEY_ACCESS_TOKEN;
        const opitons = {
            expiresIn: '1m'
        }

        jwt.sign(payload,secret,opitons, (err, token)=>{
            if (err) {
                reject(err);
            }
            resolve(token);
        })
    });
}

const signRefreshToken = async (userId)=>{
    return new Promise((resolve, reject)=>{
        const payload = {
            userId
        }

        const secret = process.env.SECRET_KEY_REFRESH_TOKEN;
        const opitons = {
            expiresIn: '1d'
        }

        jwt.sign(payload,secret,opitons, (err, token)=>{
            if (err) return reject(err);
            client.set(userId.toString(), token,{EX: 365*24*60*60, NX: true},(err, reply) =>{
                if(err){
                    return reject(createError.InternalServerError())
                }
            });
            return resolve(token);
        })
    });
}

module.exports = {signAccessToken, signRefreshToken};