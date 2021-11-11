const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String, //simplify with string
  email: String,
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