const mongoose = require('mongoose');

const OrderLineSchema = new mongoose.Schema({
  customerId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  },
  productId: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Product'
  },
  productAmount: {
    type: Number,
    default: 1
  }
});

const OrderLine = mongoose.model('OrderLine', OrderLineSchema);

module.exports = OrderLine;