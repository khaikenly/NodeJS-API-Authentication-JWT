const jwt = require('jsonwebtoken');

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

module.exports = {signAccessToken};