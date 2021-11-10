const productInterface = require('./product');
const Cart = require('../models/Cart');

//check amount of product
const checkAmount = async (productId, amount) => {
  const product = await productInterface.getProduct(productId);
  if (product.remain >= amount) {
    return true;
  } else {
    return false;
  }
};

//get carts
const getCustomerCarts = async (customerId) => {
  try {
    const carts = await Cart.find({ customerId: customerId });
    return carts;
  } catch (err) {
    return null;
  }
};

//get individual cart
const getCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId);
    return cart._doc;
  } catch (err) {
    return {
      type: 'FAIL',
      message: 'cannot get this cart'
    };
  }
};

//create cart
const createCart = async (cart) => {
  try {
    const targetProduct = cart.productId;
    //check if there is the same product in cart of that customer
    const existCart = await Cart.findOne({ productId: targetProduct, customerId: cart.customerId });
    if (existCart) {
      cart.amount = cart.amount + existCart.amount;
    }
    //check amount of that product
    const isEnough = checkAmount(cart.productId, cart.amount);
    if (isEnough) {
      const newCart = await Cart.findOneAndUpdate(
        { productId: cart.productId },
        {
          customerId: cart.customerId,
          productId: cart.productId,
          price: cart.price,
          amount: cart.amount,
        },
        { new: true, upsert: true}
      );
      return newCart;
    } else {
      //product amount in DB is not enough
      return {
        type: 'FAIL',
        message: 'this product doesn\'t have enough amount'
      }
    }
  } catch (err) {
    return null;
  }
}

//update cart
const updateCart = async (cartId, cart) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        ...cart
      },
      { new: true }
    );
    if (updatedCart.amount === 0) {
      await Cart.findByIdAndDelete(updatedCart._id);
    }
    return updatedCart;
  } catch (err) {
    return null;
  }
};

//delete cart
const deleteCart = async (cartId) => {
  try {
    await Cart.findByIdAndDelete(cartId);
    return { 
      type: 'SUCCESS',
      cartId: cartId,
      message: 'successfully removed cart'
    };
  } catch (err) {
    return null;
  }
};

const deleteAllCustomerCart = async (customerId) => {
  try {
    await Cart.deleteMany({customerId: customerId});
    return {
      type: 'SUCCESS', 
      message: 'successfully removed all carts' 
    };
  } catch (err) {
    return null;
  }
}

module.exports = {
  getCart: getCart,
  getCustomerCarts: getCustomerCarts,
  createCart: createCart,
  updateCart: updateCart,
  deleteCart: deleteCart,
  deleteAllCustomerCart: deleteAllCustomerCart,
  checkAmount: checkAmount
};
