const createError = require('http-errors');

const User = require('../Models/User.model');
const { userValidate } = require('../helpers/Validation');
const {signAccessToken, signRefreshToken} = require('../helpers/token-generator');
const {verifyRefreshToken} = require('../middleware/auth');
const client = require('../helpers/connections_redis');

module.exports = {
    register: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const { error } = userValidate(req.body);
            if (error) {
                throw createError(error.details[0].message);
            }
    
            const IsExist = await User.findOne({ username: email }).exec();
            if (IsExist) {
                throw createError.Conflict(`${email} is already been register!!!`);
            }
    
            // const isCreate = await User.create({
            //     username: email,
            //     password: password
            // }); không sử dụng được middleware('pre') trong model
    
            const user = new User({
                username: email,
                password
            });
            const savedUser = await user.save();
    
            return res.json({
                status: 200,
                elements: savedUser
            });
    
        } catch (error) {
            next(error);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const {refreshToken} = req.body;
            const payload = await verifyRefreshToken(refreshToken);
            const {userId} = payload.userId;
            const accessToken = await signAccessToken(userId);
    
            res.json({
                status: 200,
                accessToken
            });
        } catch (error) {
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            const { email, password } = req.body;
    
            const { error } = userValidate(req.body);
            if (error) {
                throw createError(error.details[0].message);
            }
    
            const user = await User.findOne({ username: email }).exec();
            if (!user) {
                throw createError.NotFound("user don't register!");
            }
    
            const isValid = await user.isCheckPassword(password);
            if (!isValid) {
                throw createError.Unauthorized();
            }
    
            const accessToken = await signAccessToken(user._id);
            const refreshToken = await signRefreshToken(user._id);
    
            return res.json({
                status: 200,
                message: "Loggin successfully!!",
                accessToken,
                refreshToken
            });
        } catch (error) {
            next(error);
        }
    },

    logout: async (req, res, next) => {
        try {
            const {refreshToken} = req.body;
            if(!refreshToken) throw createError.BadRequest();
            const payload = await verifyRefreshToken(refreshToken);
            const {err, reply} = client.del(payload.userId);
            if(err) throw createError.InternalServerError();
            res.json({
                message: 'Logout'
            });
        } catch (error) {
            next(error);
        }
    },

    getlists: (req, res, next) => {
        const users = [
            {
                email: 'abc@gmail.com'
            },
            {
                email: 'abc@gmail.com'
            }
        ]
    
        res.json({
            users
        });
    }
}