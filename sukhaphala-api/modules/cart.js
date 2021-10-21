const productInterface = require('./product');
const Cart = require('../models/Cart');

//check amount of product
const checkAmount = (product, amount) => {
  if (product.remain >= amount) {
    return true;
  } else {
    return false;
  }
}

//calculate subtotal of the orderline
const calculatePrice = async (productId, amount) => {
  const product = await productInterface.getProduct(productId);
  if (checkAmount(product, amount)) {
    return product.price * amount;
  } else {
    return null;
  }
}

//create order line
const createCart = async (cart) => {
  const subtotal = await calculatePrice(cart.productId, cart.amount);
  if (subtotal) {
    try {
      const newCart = await new Cart({
        customerId: cart.customerId,
        productId: cart.productId,
        amount: cart.amount
      });

      const savedCart = await newCart.save();
      return savedCart;
    } catch (err) {
      return null;
    }
  } else {
    //actual amount less than wanted amount
    return null;
  }
};

module.exports = { createCart: createCart };