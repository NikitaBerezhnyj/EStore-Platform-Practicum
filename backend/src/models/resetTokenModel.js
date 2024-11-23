const mongoose = require("mongoose");

const resetTokenSchema = new mongoose.Schema({
  token: { type: String, required: true },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User"
  },
  createdAt: { type: Date, default: Date.now, expires: 3600 }
});

const ResetToken = mongoose.model("ResetToken", resetTokenSchema);

module.exports = ResetToken;
