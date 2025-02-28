const express = require("express");
const router = express.Router();
const DiscountProduct = require("../models/DiscountProduct");

// Add Discount Product
router.post("/add", async (req, res) => {
  const {
    productName,
    originalPrice,
    discountPercentage,
    category,
    description,
    image,
  } = req.body;

  try {
    const newProduct = new DiscountProduct({
      productName,
      originalPrice,
      discountPercentage,
      category,
      description,
      image,
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

module.exports = router;
