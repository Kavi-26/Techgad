const mongoose = require("mongoose");

const WeeklySpecialSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true,
  },
  price: {
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
  stock: {
    type: Number,
    required: true,
  },
  limitedTime: {
    type: Number, // Time in Hours
    required: true,
  },
  // createdAt: {
  //   type: Date,
  //   default: Date.now,
  // },
});

module.exports = mongoose.model("WeeklySpecial", WeeklySpecialSchema);
