const Customer = require('../models/Customer');

const getCustomer = async (customerId) => {
  try {
    const targetCustomer = await Customer.findById(customerId);
    return targetCustomer._doc;
  } catch (err) {
    return {
      type: 'FAIL',
      customerId: customerId,
      message: 'cannot get infomation about this customer'
    };
  }
};

const getCustomerByEmail = async (email) => {
  try {
    const targetCustomer = await Customer.findOne({email: email});
    return targetCustomer;
  } catch (err) {
    return {
      type: 'FAIL',
      email: email,
      message: 'Cannot get information about this customer\'s email'
    };
  }
  
}
 
const createCustomer = async (customer) => {
  //create new customer
  const newCustomer = new Customer({
    firstname: customer.firstname,
    lastname: customer.lastname,
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
    return {
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