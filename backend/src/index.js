const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.DB || "mongodb://localhost:27017/estore";

app.use(express.json());

mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`Підключено до MongoDB за посиланням ${process.env.DB}`);
    app.listen(PORT, () => {
      console.log(`Сервер запущено на порту ${PORT}`);
    });
  })
  .catch(error => {
    console.error("Помилка підключення до MongoDB:", error.message);
    process.exit(1);
  });

app.post("/test", (req, res) => {
  res.send(`Сервер працює на ${process.env.PORT}`);
});
