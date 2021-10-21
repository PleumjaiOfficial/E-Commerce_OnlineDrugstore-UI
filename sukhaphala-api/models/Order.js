const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  }, 
  update_time: {
    type: Date,
    default: Date.now(),
  },
  status: String, //inCart, orderPlaced, purchased, cancel
  total_money: Number,
  order_line: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      }, 
      amount: Number
    }
  ]
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;