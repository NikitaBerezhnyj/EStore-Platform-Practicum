const redis = require("redis");

let redisClient;

const connectRedis = async () => {
  try {
    redisClient = redis.createClient({
      host: process.env.REDIS_HOST,
      port: process.env.REDIS_PORT
    });
    console.log("Connected to redis successfully");
  } catch (error) {
    console.error("Redis connection error:", error);
    process.exit(1);
  }
};

module.exports = {
  connectRedis,
  redisClient
};
