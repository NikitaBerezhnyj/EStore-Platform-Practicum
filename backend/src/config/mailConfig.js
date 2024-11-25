require("dotenv").config();
const nodemailer = require("nodemailer");

if (!process.env.EMAIL || !process.env.PASSWORD) {
  console.error("EMAIL or PASSWORD environment variables are missing.");
  process.exit(1);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD
  }
});

module.exports = transporter;
