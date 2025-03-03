const express = require("express");
const router = express.Router();
const DiscountProduct = require("../models/DiscountProduct");

// Add Discount Product with Stock
router.post("/add", async (req, res) => {
  const {
    productName,
    originalPrice,
    discountPercentage,
    category,
    description,
    image,
    stock,
  } = req.body;

  try {
    const newProduct = new DiscountProduct({
      productName,
      originalPrice,
      discountPercentage,
      category,
      description,
      image,
      stock,
    });

    await newProduct.save();
    res.status(201).json({ message: "Discount Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Add Discount Product" });
  }
});

// Fetch Discount Products
router.get("/", async (req, res) => {
  try {
    const products = await DiscountProduct.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Discount Products" });
  }
});

// Payment Route to Reduce Stock
router.post("/processpayment", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await DiscountProduct.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock >= quantity) {
      product.stock -= quantity;
      await product.save();
      res.status(200).json({ message: "Payment Successful, Stock Updated" });
    } else {
      res.status(400).json({ message: "Insufficient stock" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server Error", error });
  }
});

module.exports = router;