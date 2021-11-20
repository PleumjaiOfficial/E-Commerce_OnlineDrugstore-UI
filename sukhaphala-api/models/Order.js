const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Customer',
    required: true
  }, 
  updateTime: {
    type: Date,
    default: Date.now(),
  },
  status: String, //inCart, orderPlaced, purchased, cancel
  totalMoney: {
    type: Number,
    required: true
  },
  orderLine: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      }, 
      amount: Number
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;