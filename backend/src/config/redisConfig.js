const redis = require("redis");

const redisClient = redis.createClient({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});

redisClient.on("error", err => {
  console.error("Redis connection error:", err);
});

redisClient
  .connect()
  .then(() => {
    console.log("Connected to Redis");
  })
  .catch(err => {
    console.error("Error connecting to Redis:", err);
  });

module.exports = redisClient;
