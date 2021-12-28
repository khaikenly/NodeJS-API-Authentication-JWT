const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {connectionTest, connectionUser} = require('../helpers/connections_multi_mongdb');
const bcrypt = require('bcrypt');

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

UserSchema.pre('save', async function (next){
    try {
        const salt = await bcrypt.genSaltSync(10);
        const hashpass = await bcrypt.hashSync(this.password, salt);
        this.password = hashpass;
        next(); 
    } catch (error) {
        next(error);
    }
});

UserSchema.methods.isCheckPassword = async function(passwordHash) {
    try {
        return bcrypt.compareSync(passwordHash, this.password);
    } catch (error) {
        return error;
    }
}

module.exports =  connectionTest.model('users',UserSchema);