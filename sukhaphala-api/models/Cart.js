const mongoose = require('mongoose');

const CartSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  amount: {
    type: Number,
    default: 1
  },
  subtotal: Number
});

const Cart = mongoose.model('Cart', CartSchema);

module.exports = Cart;