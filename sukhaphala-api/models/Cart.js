const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  price: {
    type: Number,
    default: 0
  },
  amount: {
    type: Number,
    default: 1
  }
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;