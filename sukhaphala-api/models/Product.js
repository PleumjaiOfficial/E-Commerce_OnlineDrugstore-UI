const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  remain: Number,
  health_goal: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;