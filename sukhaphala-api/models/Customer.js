const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String, //simplify with string
  email: String,
  address: [
    {
      location: String,
      district: String,
      country: String,
      postcode: Number
    }
  ],
});

const Customer = mongoose.model('Customer', customerSchema);

module.exports = Customer;