require("dotenv").config();
const connectionServer = require("./config/serverConfig");
const connectionDB = require("./config/dbConfig");
const { connectRedis } = require("./config/redisConfig");

const app = connectionServer();

const host = process.env.HOSTNAME || "localhost";
const port = Number(process.env.PORT) || 5000;

const startServer = async () => {
  try {
    await connectionDB();
    await connectRedis();

    app.listen(port, host, () => {
      console.log(`Server started on http://${host}:${port}`);
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
    process.exit(1);
  }
};

startServer();
