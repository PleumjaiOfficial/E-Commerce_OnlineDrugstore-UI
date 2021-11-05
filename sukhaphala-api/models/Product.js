const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    default: 'http://localhost:5000/images/default-image.jpg'
  },
  description: String,
  price: Number,
  remain: Number,
  healthGoal: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;