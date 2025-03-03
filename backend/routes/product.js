const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add Product Route
router.post("/add", async (req, res) => {
  const { productName, price, category, description, image, stock } = req.body;

  try {
    const newProduct = new Product({
      productName,
      price,
      category,
      description,
      image,
      stock,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
});

// Fetch All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

// Process Payment and Reduce Stock
router.post("/processpayment", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    product.stock -= quantity; // Reduce Stock
    await product.save();

    res.status(200).json({ message: "Payment Successful, Stock Updated" });
  } catch (error) {
    res.status(500).json({ message: "Payment Failed" });
  }
});

module.exports = router;

