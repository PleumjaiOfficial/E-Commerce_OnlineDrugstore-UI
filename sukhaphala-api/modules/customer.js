const Customer = require('../models/Customer');
const cartInterface = require('./cart');

// const createCustomer = ({customer}) => {
  
// };

const addProductToCart = async (wantedProduct, customerId) => {
  const cart = {
    customerId: customerId,
    productId: wantedProduct.productId,
    amount: wantedProduct.amount
  };
  console.log(cart);
  const createdCart = await cartInterface.createCart(cart);
  if (createdCart) {
    return createdCart;
  } else {
    return null;
  }
};

module.exports = { addProductToCart: addProductToCart };