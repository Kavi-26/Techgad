const express = require("express");
const router = express.Router();
const WeeklySpecial = require("../models/WeeklySpecial");

// Add Weekly Special Product
router.post("/add", async (req, res) => {
  const { 
    productName, 
    price, 
    category, 
    description, 
    image, 
    stock, 
    limitedTime 
  } = req.body;

  try {
    const newProduct = new WeeklySpecial({
      productName,
      price,
      category,
      description,
      image,
      stock,
      limitedTime,
    });

    await newProduct.save();
    res.status(201).json({ message: "Weekly Special Product Added Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to Add Weekly Special Product", error });
  }
});

// Fetch Weekly Special Products
router.get("/", async (req, res) => {
  try {
    const products = await WeeklySpecial.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to Fetch Weekly Special Products", error });
  }
});

// Payment Route to Reduce Stock
router.post("/processpayment", async (req, res) => {
  const { productId, quantity } = req.body;

  try {
    const product = await WeeklySpecial.findById(productId);

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
