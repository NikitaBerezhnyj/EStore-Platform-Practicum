require("dotenv").config();
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const {
  User,
  validateRegistration,
  validateLogin,
  validatePassword
} = require("../models/userModel");
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

    const userUsername = await User.findOne({ username: req.body.username });
    if (userUsername)
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
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateUser = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getUserOrders = async (req, res) => {
  try {
    res.status(201).send({ message: "Test passed!" });
  } catch (err) {
    console.error("Test error:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
