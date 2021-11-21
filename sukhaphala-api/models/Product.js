const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    default: 'http://localhost:5000/images/default-image.jpg'
  },
  description: String,
  price: {
    type: Number,
    required: true
  },
  remain: {
    type: Number,
    min: 0,
    default: 0,
    required: true
  },
  healthGoal: [String]
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;