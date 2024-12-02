require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  User,
  validateRegistration,
  validateLogin,
  validatePassword
} = require("../models/userModel");
const { Order } = require("../models/orderModel");
const { Product } = require("../models/productModel");
const redisClient = require("../config/redisConfig");
const transporter = require("../config/mailConfig");

// Реєстрація користувача
exports.registerUser = async (req, res) => {
  try {
    const { error } = validateRegistration(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const userEmail = await User.findOne({ email: req.body.email });
    if (userEmail)
      return res.status(409).send({ message: "User with given email already exists!" });

    const userUsername = await User.findOne({ username: req.body.name });
    if (userUsername != null)
      return res.status(409).send({ message: "User with given username already exists!" });

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    await new User({ ...req.body, password: hashPassword }).save();
    res.status(201).send({ message: "User created successfully" });
  } catch (err) {
    console.error("Error during user registration:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Вхід користувача
exports.loginUser = async (req, res) => {
  try {
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send({ message: error.details[0].message });

    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(401).send({ message: "Invalid Email or Password" });

    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(401).send({ message: "Invalid Email or Password" });

    const token = user.generateAuthToken();
    res.status(200).send({
      message: "Logged in successfully",
      token: token
    });
  } catch {
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Користувач забув пароль
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const resetToken = crypto.randomBytes(32).toString("hex");

    if (!redisClient) {
      return res.status(500).json({ message: "Redis client not initialized" });
    }

    redisClient.set(resetToken, user._id.toString(), "EX", 3600, err => {
      if (err) {
        console.error("Error storing token in Redis:", err);
        return res.status(500).json({ message: "Failed to store token in Redis" });
      }
    });

    const resetURL = `http://localhost:5173/reset-password/${resetToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Password Reset",
      text: `You requested a password reset. Please click the following link to reset your password: ${resetURL}`
    });

    res.status(200).json({ message: "Password reset email sent", resetToken: resetToken });
  } catch (error) {
    console.error("Error sending password reset email:", error);
    res.status(500).json({ message: "Error sending password reset email" });
  }
};

// Заміна пароля користувача
exports.resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  if (!password) return res.status(400).json({ message: "Password is required" });

  const { error } = validatePassword(password);
  if (error) return res.status(400).json({ message: error.details[0].message });

  try {
    const userId = await redisClient.get(token);

    if (!userId) {
      return res.status(400).json({ message: "Invalid or expired token" });
    }

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const isSamePassword = await bcrypt.compare(password, user.password);
    if (isSamePassword) {
      return res.status(400).json({
        message: "New password must be different from the current one."
      });
    }

    const salt = await bcrypt.genSalt(Number(process.env.SALT));
    const hashedPassword = await bcrypt.hash(password, salt);

    user.password = hashedPassword;
    await user.save();

    await redisClient.del(token);

    res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    res.status(500).json({ message: "Error resetting password" });
  }
};

exports.getUserInfo = async (req, res) => {
  try {
    const { userId } = req.params;

    // Пошук користувача по ID
    const user = await User.findById(userId).select("name email phone role");
    if (!user) {
      return res.status(404).send({ message: "User not found." });
    }

    let orders;

    // Пошук замовлень в залежності від ролі користувача
    if (user.role === "customer") {
      orders = await Order.find({ customer: userId })
        .select("date items total status delivery_address payment_method notes")
        .populate({
          path: "items.product",
          select: "name price"
        });
    } else if (user.role === "seller") {
      orders = await Order.find({ seller: userId })
        .select("date items total status delivery_address payment_method notes")
        .populate({
          path: "items.product",
          select: "name price"
        });
    } else {
      return res.status(400).send({ message: "Invalid role" });
    }

    // Форматування замовлень для відповіді
    const formattedOrders = orders.map(order => ({
      id: order._id,
      date: order.date,
      items: order.items.map(item => ({
        product: item.product.name,
        price: item.product.price,
        quantity: item.quantity,
        totalItemPrice: item.product.price * item.quantity // Додавання вартості товару в замовленні
      })),
      total: order.total,
      status: order.status,
      delivery_address: {
        city: order.delivery_address.city,
        street: order.delivery_address.street,
        house_number: order.delivery_address.house_number,
        apartment: order.delivery_address.apartment,
        recipient_name: order.delivery_address.recipient_name,
        phone: order.delivery_address.phone
      },
      payment_method: order.payment_method,
      notes: order.notes || "No notes provided" // Примітки до замовлення, якщо є
    }));

    // Відправлення відповіді
    res.status(200).send({
      name: user.name,
      email: user.email,
      phone: user.phone || null,
      orders: formattedOrders
    });
  } catch (err) {
    console.error("Error fetching user info:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Оновлення даних користувача
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, role } = req.body;
    const { userId } = req.params;

    if (!name || !email || !role) {
      return res.status(400).send({ message: "Invalid data provided" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).send({ message: "Invalid email format" });
    }

    if (phone && !/^(\+?\d{1,4}[\s-]?)?(\(?\d{1,3}\)?[\s-]?)?[\d\s-]{7,}$/.test(phone)) {
      return res.status(400).send({ message: "Invalid phone format" });
    }

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    user.name = name;
    user.email = email;
    user.role = role;

    if (phone) {
      user.phone = phone;
    }

    await user.save();

    res.status(200).send({ message: "Profile updated successfully" });
  } catch (err) {
    console.error("Error updating user:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

// Видалення користувача
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).send({ message: "User ID is required" });
    }

    const user = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    const deletedUserId = "deleted_user";

    let deletedUser = await User.findOne({ id: deletedUserId });
    if (!deletedUser) {
      deletedUser = new User({
        id: deletedUserId,
        name: "Deleted User",
        email: null,
        phone: null,
        password: null,
        createdAt: new Date(),
        updatedAt: new Date()
      });
      await deletedUser.save();
    }

    await Order.updateMany({ userId: userId }, { userId: deletedUserId });
    await Product.updateMany({ userId: userId }, { userId: deletedUserId });

    await User.deleteOne({ id: userId });

    res.status(200).send({ message: "User account deleted successfully" });
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
