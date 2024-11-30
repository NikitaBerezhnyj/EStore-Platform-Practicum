const mongoose = require("mongoose");
const Joi = require("joi");

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  seller: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  date: {
    type: Date,
    default: Date.now,
    required: true
  },
  delivery_address: {
    city: { type: String, required: true },
    street: { type: String, required: true },
    house_number: { type: String, required: true },
    apartment: { type: String, default: null },
    recipient_name: { type: String, required: true },
    phone: { type: String, required: true }
  },
  payment_method: {
    type: String,
    enum: ["card", "cash"],
    required: true
  },
  payment_status: {
    type: Boolean,
    default: false
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true,
        min: 1
      }
    }
  ],
  notes: {
    type: String,
    default: null
  },
  total: {
    type: Number,
    required: true,
    min: 1
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Delivered", "Cancelled"],
    default: "Pending"
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

orderSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Order = mongoose.model("Order", orderSchema);

const validateOrder = data => {
  const schema = Joi.object({
    customer: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .label("Customer ID"),
    seller: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .label("Seller ID"),
    date: Joi.date().optional().label("Order Date"),
    delivery_address: Joi.object({
      city: Joi.string().required().label("City"),
      street: Joi.string().required().label("Street"),
      house_number: Joi.string().required().label("House Number"),
      apartment: Joi.string().optional().allow(null).label("Apartment"),
      recipient_name: Joi.string().required().label("Recipient Name"),
      phone: Joi.string()
        .pattern(/^\+380\d{9}$/)
        .required()
        .label("Phone")
    }).required(),
    payment_method: Joi.string().valid("card", "cash").required().label("Payment Method"),
    payment_status: Joi.bool().default(false).label("Payment Status"),
    items: Joi.array()
      .items(
        Joi.object({
          product: Joi.string()
            .pattern(/^[0-9a-fA-F]{24}$/)
            .required()
            .label("Product ID"),
          quantity: Joi.number().integer().min(1).required().label("Quantity")
        })
      )
      .min(1)
      .required()
      .label("Items"),
    notes: Joi.string().optional().allow(null).label("Notes"),
    total: Joi.number().integer().min(1).required().label("Total"),
    status: Joi.string()
      .valid("Pending", "In Progress", "Delivered", "Cancelled")
      .optional()
      .label("Order Status")
  });
  return schema.validate(data);
};

module.exports = {
  Order,
  validateOrder
};
