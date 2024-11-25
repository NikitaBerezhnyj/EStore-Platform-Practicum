const express = require("express");
const {
  createOrder,
  getOrder,
  getUserOrders,
  updateOrder,
  deleteOrder
} = require("../controllers/ordersControllers");

const router = express.Router();

// Створення нового замовлення
router.post("/order", async (req, res) => {
  try {
    await createOrder(req, res);
  } catch (error) {
    console.error("Error creating order: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання інформації про конкретне замовлення
router.get("/order/:orderId", async (req, res) => {
  try {
    await getOrder(req, res);
  } catch (error) {
    console.error("Error fetching order: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання інформації про всі замовлення користувача
router.get("/order/:userId", async (req, res) => {
  try {
    await getUserOrders(req, res);
  } catch (error) {
    console.error("Error fetching user orders: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Оновлення інформації про замовлення
router.put("/order/:orderId", async (req, res) => {
  try {
    await updateOrder(req, res);
  } catch (error) {
    console.error("Error updating order: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Видалення замовлення
router.delete("/order/:orderId", async (req, res) => {
  try {
    await deleteOrder(req, res);
  } catch (error) {
    console.error("Error deleting order: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
