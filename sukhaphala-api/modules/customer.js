const Customer = require('../models/Customer');
const cartInterface = require('./cart');
const orderInterface = require('./order');

// const createCustomer = ({customer}) => {
  
// };

const getCustomerCarts = async (customerId) => {
  const carts = await cartInterface.getCarts(customerId);
  if (carts) {
    return carts;
  } else {
    return null;
  }
};

const addProductToCart = async (wantedProduct, customerId) => {
  const cart = {
    customerId: customerId,
    productId: wantedProduct.productId,
    amount: wantedProduct.amount
  };
  const createdCart = await cartInterface.createCart(cart);
  if (createdCart) {
    return createdCart;
  } else {
    return null;
  }
};

// add product amount in the cart
const updateProductAmountInCart = async (cartId, customerId, cart) => {
  //customerId may be use for access control
  try {
    const updatedCart = await cartInterface.updateCart(cartId, cart);
    return updatedCart;
  } catch (err) {
    return null;
  }
};

const deleteCustomerCart = async(cartId, customerId) => {
  //customerId may be use for access control
  try {
    const result = await cartInterface.deletedCart(cartId);
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  };
};

const placeOrder = async (customerId) => {
  try {
    const result = await orderInterface.createOrder(customerId);
    //maybe replace this hard code string later
    if (result) {
      return result;
    } else {
      return null;
    }
  } catch (err) {
    return null;
  };
};

module.exports = {
  getCustomerCarts: getCustomerCarts,
  addProductToCart: addProductToCart, 
  updateProductAmountInCart: updateProductAmountInCart,
  deleteCustomerCart: deleteCustomerCart,
  placeOrder: placeOrder
};