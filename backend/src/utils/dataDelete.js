require("dotenv").config();
const mongoose = require("mongoose");
const connectionDB = require("../config/dbConfig");
const { User } = require("../models/userModel");
const { Product } = require("../models/productModel");
const { Order } = require("../models/orderModel");

const deleteAllRecords = async () => {
  try {
    await connectionDB();

    const userResult = await User.deleteMany({});
    const productResult = await Product.deleteMany({});
    const orderResult = await Order.deleteMany({});

    console.log(
      `${userResult.deletedCount} користувач(і), ${productResult.deletedCount} продукт(и), ${orderResult.deletedCount} замовлень успішно видалено.`
    );
  } catch (error) {
    console.error("Помилка при видаленні даних:", error.message);
  } finally {
    await mongoose.connection.close();
  }
};

module.exports = { deleteAllRecords };
