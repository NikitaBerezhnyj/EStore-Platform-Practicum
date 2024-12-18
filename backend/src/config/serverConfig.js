const express = require("express");
const cors = require("cors");
const path = require("path");
const serverStatusRoutes = require("../routes/serverStatusRoutes");
const usersRoutes = require("../routes/usersRoutes");
const productRoutes = require("../routes/productsRoutes");
const orderRoutes = require("../routes/ordersRoutes");
const uploadRoutes = require("../routes/uploadRoutes");

const createServer = () => {
  const app = express();

  // Перевірка необхідних змінних середовища
  const requiredEnvVars = [
    "PORT",
    "HOSTNAME",
    "ORIGIN_WEBSITE",
    "DB",
    "SALT",
    "JWT_PRIVATE_TOKEN",
    "EMAIL",
    "PASSWORD"
  ];
  const missingVars = requiredEnvVars.filter(key => !process.env[key]);

  if (missingVars.length > 0) {
    console.error(`Missing necessary environment variables: ${missingVars.join(", ")}`);
    process.exit(1);
  }

  // Налаштування CORS
  app.use(cors({ origin: process.env.ORIGIN_WEBSITE || "http://localhost:5173" }));

  // Для обробки JSON-запитів
  app.use(express.json());

  // Підключення роутерів
  app.use("/api", serverStatusRoutes);
  app.use("/api", usersRoutes);
  app.use("/api", productRoutes);
  app.use("/api", orderRoutes);
  app.use("/api", uploadRoutes);

  // Статичні файли (наприклад, для зображень чи інших ресурсів)
  app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));

  // Відправлення вашого клієнтського застосунку
  // app.use(express.static(path.join(__dirname, "..", "..", "build")));
  // app.get("*", (req, res) => {
  //   res.sendFile(path.join(__dirname, "..", "..", "build", "index.html"));
  // });

  return app;
};

module.exports = createServer;
