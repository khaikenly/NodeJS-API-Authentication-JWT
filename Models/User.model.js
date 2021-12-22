const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {connectionTest, connectionUser} = require('../helpers/connections_multi_mongdb');

const UserSchema = new Schema({
    username: {
        type: String,
        lowercase: true,
        unique: true,
        require: true
    },
    password: {
        type: String,
        require: true
    }
});

module.exports =  connectionTest.model('users',UserSchema);