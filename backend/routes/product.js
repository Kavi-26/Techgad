const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// Add Product Route
router.post("/add", async (req, res) => {
  const { productName, price, category, description, image } = req.body;

  try {
    const newProduct = new Product({
      productName,
      price,
      category,
      description,
      image,
    });

    await newProduct.save();
    res.status(201).json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to add product", error });
  }
});

module.exports = router;



// Fetch All Products
router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products" });
  }
});

