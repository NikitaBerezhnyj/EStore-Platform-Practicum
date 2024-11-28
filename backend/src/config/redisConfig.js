const redis = require("redis");

(async () => {
  try {
    const redisClient = redis.createClient({
      socket: {
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT
      }
    });

    redisClient.on("error", err => console.error("Redis error:", err));

    await redisClient.connect();

    console.log("Connected to Redis successfully");
    await redisClient.quit();
  } catch (err) {
    console.error("Redis connection failed:", err);
  }
})();
