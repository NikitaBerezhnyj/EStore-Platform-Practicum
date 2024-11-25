const express = require("express");
const {
  registerUser,
  loginUser,
  forgotPassword,
  resetPassword,
  getUserInfo,
  updateUser,
  deleteUser,
  getUserOrders
} = require("../controllers/usersControllers");

const router = express.Router();

// Реєстрація користувача
router.post("/auth/register", async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    console.error("Error registering user: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Вхід користувача
router.post("/auth/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    console.error("Error login user: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Користувач забув пароль
router.post("/auth/password-reset", async (req, res) => {
  try {
    await forgotPassword(req, res);
  } catch (error) {
    console.error("Error resetting password: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Заміна пароля користувача
router.post("/auth/password-change/:token", async (req, res) => {
  try {
    await resetPassword(req, res);
  } catch (error) {
    console.error("Error changing password: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання інформації про користувача
router.get("/user/:userId", async (req, res) => {
  try {
    await getUserInfo(req, res);
  } catch (error) {
    console.error("Error fetching user info: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Оновлення інформації про користувача
router.put("/user/:userId", async (req, res) => {
  try {
    await updateUser(req, res);
  } catch (error) {
    console.error("Error updating user info: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Видалення користувача
router.delete("/user/:userId", async (req, res) => {
  try {
    await deleteUser(req, res);
  } catch (error) {
    console.error("Error deleting user: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання всіх замовлень користувача
router.get("/user/:userId/orders", async (req, res) => {
  try {
    await getUserOrders(req, res);
  } catch (error) {
    console.error("Error fetching user orders: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
