const { createClient } = require('redis');

const client = createClient({
        port: 6379,
        host: '127.0.0.1'
});

(async () => {
    await client.connect();
})();

client.on('connect', () => console.log('Redis Client Connected'));
client.on('error', (err) => console.log('Redis Client Connection Error', err));

module.exports = client;