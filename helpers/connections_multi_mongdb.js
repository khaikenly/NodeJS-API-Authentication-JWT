const mongoose = require('mongoose');
require('dotenv').config();

function newConnection(uri){
    const conn = mongoose.createConnection(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    conn.on('connected',function(){
        console.log(`Mongodb::: connected::: ${this.name}`);
    });
    
    conn.on('disconnected',function(){
        console.log(`Mongodb::: disconnected::: ${this.name}`);
    });
    
    conn.on('error',(error)=>{
        console.log(`Mongodb::: connected::: ${JSON.stringify(error)}`);
    });

    return conn;
};

const connectionTest = new newConnection(process.env.URI_MONGODB_TEST);
const connectionUser = new newConnection(process.env.URI_MONGODB_USER);

module.exports = {connectionTest,connectionUser}