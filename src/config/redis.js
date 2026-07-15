const Redis = require('ioredis');

const redisClient = process.env.REDIS_URL
  ? new Redis(process.env.REDIS_URL)
  : new Redis({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

module.exports = redisClient;



