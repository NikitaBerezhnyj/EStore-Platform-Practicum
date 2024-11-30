const express = require("express");
const {
  createProduct,
  getProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  searchProducts
} = require("../controllers/productsControllers");

const router = express.Router();

// Створення нового продукту
router.post("/product", async (req, res) => {
  try {
    await createProduct(req, res);
  } catch (error) {
    console.error("Error creating product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання інформації про конкретний продукт
router.get("/product/:productId", async (req, res) => {
  try {
    await getProduct(req, res);
  } catch (error) {
    console.error("Error fetching product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Оновлення продукту
router.put("/product/:productId", async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (error) {
    console.error("Error updating product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Видалення продукту
router.delete("/product/:productId", async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (error) {
    console.error("Error deleting product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Отримання всіх продуктів
router.get("/products", async (req, res) => {
  try {
    await getAllProducts(req, res);
  } catch (error) {
    console.error("Error fetching products: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

// Пошук продуктів
router.get("/products/search", async (req, res) => {
  try {
    await searchProducts(req, res);
  } catch (error) {
    console.error("Error searching product: ", error);
    res.status(500).send({ message: "Internal Server Error" });
  }
});

module.exports = router;
