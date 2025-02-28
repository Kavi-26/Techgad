const mongoose = require("mongoose");

const DiscountProductSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  originalPrice: {
    type: Number,
    required: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("DiscountProduct", DiscountProductSchema);
