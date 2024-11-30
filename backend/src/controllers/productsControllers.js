const { Product } = require("../models/productModel");

exports.createProduct = async (req, res) => {
  try {
    const { seller_id, name, description, photo_url, category, price, quantity } = req.body;

    if (!seller_id || !name || !description || !photo_url || !category || !price || !quantity) {
      return res.status(400).send({ message: "Invalid product data" });
    }

    if (typeof price !== "number" || price <= 0) {
      return res.status(400).send({ message: "Price must be a positive number" });
    }

    if (typeof quantity !== "number" || quantity < 0) {
      return res.status(400).send({ message: "Quantity must be a non-negative number" });
    }

    const newProduct = new Product({
      seller_id,
      name,
      description,
      photo_url,
      category,
      price,
      quantity
    });

    await newProduct.save();

    res.status(201).send({ message: "Product successfully created" });
  } catch (err) {
    console.error("Error creating product:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();

    if (!products || products.length === 0) {
      return res.status(404).send({ message: "No products found" });
    }

    res.status(200).send(products);
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.getProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(product);
  } catch (err) {
    console.error("Error fetching product:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.searchProducts = async (req, res) => {
  try {
    const { q, category, min_price, max_price } = req.query;

    const searchConditions = {};

    if (q) {
      searchConditions.$or = [
        { name: { $regex: q, $options: "i" } },
        { description: { $regex: q, $options: "i" } }
      ];
    }

    if (category) {
      searchConditions.category = category;
    }

    if (min_price) {
      searchConditions.price = { ...searchConditions.price, $gte: min_price };
    }

    if (max_price) {
      searchConditions.price = { ...searchConditions.price, $lte: max_price };
    }

    const products = await Product.find(searchConditions);

    if (products.length > 0) {
      res.status(200).send({ products });
    } else {
      res.status(404).send({ message: "No products found" });
    }
  } catch (err) {
    console.error("Error fetching products:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { productId } = req.params;
    const updateData = req.body;

    if (!productId) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    if (!updateData || Object.keys(updateData).length === 0) {
      return res.status(400).send({ message: "Update data is required" });
    }

    const updatedProduct = await Product.findByIdAndUpdate(productId, updateData, {
      new: true,
      runValidators: true
    });

    if (!updatedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send(updatedProduct);
  } catch (err) {
    console.error("Error updating product:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.params;

    if (!productId) {
      return res.status(400).send({ message: "Product ID is required" });
    }

    const deletedProduct = await Product.findByIdAndDelete(productId);

    if (!deletedProduct) {
      return res.status(404).send({ message: "Product not found" });
    }

    res.status(200).send({ message: "Product successfully deleted" });
  } catch (err) {
    console.error("Error deleting product:", err);
    res.status(500).send({ message: "Internal Server Error" });
  }
};
