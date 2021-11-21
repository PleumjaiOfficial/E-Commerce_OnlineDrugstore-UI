const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }, //simplify with string
  email: {
    type: String,
    required: true
  },
  phone: String,
  address: {
    location: String,
    district: String,
    country: String,
    postcode: Number
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;