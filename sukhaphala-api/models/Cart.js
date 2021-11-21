const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer',
    required: true
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product',
    required: true
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  amount: {
    type: Number,
    default: 1,
    required: true
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;