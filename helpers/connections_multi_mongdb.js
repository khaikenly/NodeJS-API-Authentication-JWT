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

const dbHost = process.env.DB_HOST || 'localhost'
const dbPort = process.env.DB_PORT || 27017
const dbName = process.env.DB_NAME || 'test'

const URI_MONGODB_TEST_DOCKER= `mongodb://${dbHost}:${dbPort}/${dbName}`
const connectionTest = new newConnection(URI_MONGODB_TEST_DOCKER);
// const connectionUser = new newConnection(process.env.URI_MONGODB_USER);

module.exports = {connectionTest}