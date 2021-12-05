const Customer = require('../models/Customer');

//get detail about the user by customer id
const getCustomer = async (customerId) => {
  try {
    const targetCustomer = await Customer.findById(customerId);
    return targetCustomer._doc;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: `cannot get infomation about this customer (customer id: ${customerId})`
    };
  }
};

//get detail about the user by email
const getCustomerByEmail = async (email) => {
  try {
    const targetCustomer = await Customer.findOne({email: email});
    return targetCustomer;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: `Cannot get information about this customer\'s email (email: ${email})`
    };
  }
  
}

//create new customer
const createCustomer = async (customer) => {
  const newCustomer = new Customer({
    firstName: customer.firstname,
    lastName: customer.lastname,
    password: customer.password,
    email: customer.email,
    phone: customer.phone,
    address: {
      location: customer.address.location,
      district: customer.address.district,
      country: customer.address.country,
      postcode: customer.address.postcode
    }
  });

  try {
    const savedCustomer = await newCustomer.save();
    return savedCustomer;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'cannot create new user'
    }
  }
};

module.exports = {
  getCustomer: getCustomer,
  getCustomerByEmail: getCustomerByEmail,
  createCustomer: createCustomer
};