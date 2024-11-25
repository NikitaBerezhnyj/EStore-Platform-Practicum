const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      price: {
        type: Number,
        required: true
      },
      quantity: {
        type: Number,
        default: 1,
        required: true
      }
    }
  ],
  total: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered", "Cancelled"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

const Order = mongoose.model("Order", orderSchema);

const validateOrder = data => {
  const schema = Joi.object({
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .label("User ID"),
    date: Joi.date().optional().label("Order Date"),
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .label("Product ID"),
          price: Joi.number().required().min(0).label("Price"),
          quantity: Joi.number().required().min(1).label("Quantity")
        })
      )
      .min(1)
      .required()
      .label("Items"),
    total: Joi.number().required().min(0).label("Total Price"),
    status: Joi.string()
      .valid("Pending", "In Progress", "Delivered", "Cancelled")
      .optional()
      .label("Order Status")
  });

  return schema.validate(data);
};

const validateOrderUpdate = data => {
  const schema = Joi.object({
    user: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .optional()
      .label("User ID"),
    date: Joi.date().optional().label("Order Date"),
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .optional()
            .label("Product ID"),
          price: Joi.number().optional().min(0).label("Price"),
          quantity: Joi.number().optional().min(1).label("Quantity")
        })
      )
      .optional()
      .label("Items"),
    total: Joi.number().optional().min(0).label("Total Price"),
    status: Joi.string()
      .valid("Pending", "In Progress", "Delivered", "Cancelled")
      .optional()
      .label("Order Status")
  });

  return schema.validate(data);
};

module.exports = {
  Order,
  validateOrder,
  validateOrderUpdate
};
