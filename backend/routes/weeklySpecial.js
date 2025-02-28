const express = require("express");
const router = express.Router();
const WeeklySpecial = require("../models/WeeklySpecial");

// Create Weekly Special
router.post("/", async (req, res) => {
  try {
    const product = await WeeklySpecial.create(req.body);
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get All Weekly Specials
router.get("/", async (req, res) => {
  try {
    const products = await WeeklySpecial.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get Single Product by ID
router.get("/:id", async (req, res) => {
  try {
    const product = await WeeklySpecial.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete Product
router.delete("/:id", async (req, res) => {
  try {
    const product = await WeeklySpecial.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).json({ message: "Product Not Found" });
    }
    res.status(200).json({ message: "Product Deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
