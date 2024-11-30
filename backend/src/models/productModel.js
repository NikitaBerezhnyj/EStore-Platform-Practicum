const mongoose = require("mongoose");
const Joi = require("joi");

const productSchema = new mongoose.Schema({
  seller_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  name: { type: String, required: true, trim: true },
  description: { type: String, required: true, trim: true },
  photo_url: { type: String, required: true },
  category: {
    type: String,
    required: true,
    enum: ["electronics", "clothing", "furniture", "books", "other"]
  },
  price: { type: Number, required: true, min: 0 },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

productSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const Product = mongoose.model("Product", productSchema);

const validateProduct = data => {
  const schema = Joi.object({
    seller_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .label("Seller ID"),
    name: Joi.string().required().label("Name"),
    description: Joi.string().required().label("Description"),
    photo_url: Joi.string().uri().required().label("Photo URL"),
    category: Joi.string()
      .valid("electronics", "clothing", "furniture", "books", "other")
      .required()
      .label("Category"),
    price: Joi.number().required().min(0).label("Price")
  });
  return schema.validate(data);
};

const validateProductUpdate = data => {
  const schema = Joi.object({
    seller_id: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .label("Seller ID"),
    name: Joi.string().optional().label("Name"),
    description: Joi.string().optional().label("Description"),
    photo_url: Joi.string().uri().optional().label("Photo URL"),
    category: Joi.string()
      .valid("electronics", "clothing", "furniture", "books", "other")
      .optional()
      .label("Category"),
    price: Joi.number().optional().min(0).label("Price")
  });
  return schema.validate(data);
};

module.exports = {
  Product,
  validateProduct,
  validateProductUpdate
};
