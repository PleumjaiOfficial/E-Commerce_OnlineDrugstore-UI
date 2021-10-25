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
const getCarts = async (customerId) => {
  try {
    const carts = await Cart.find({ customerId: customerId });
    return carts;
  } catch (err) {
    return null;
  }
};

//create cart
const createCart = async (cart) => {
  const isEnough = checkAmount(cart.productId, cart.amount);
  if (isEnough) {
    try {
      const newCart = await Cart.findOneAndUpdate(
        { productId: cart.productId },
        {
          customerId: cart.customerId,
          productId: cart.productId,
          amount: cart.amount,
        },
        { new: true, upsert: true}
      );

      return newCart;
    } catch (err) {
      return null;
    }
  } else {
    //actual amount less than wanted amount
    return null;
  }
};

//update cart
const updateCart = async (cartId, cart) => {
  try {
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        $set: { amount: cart.amount },
      },
      { new: true }
    );
    return updatedCart;
  } catch (err) {
    return null;
  }
};

//delete cart
const deletedCart = async (cartId) => {
  try {
    await Cart.findByIdAndDelete(cartId);
    return { message: "successfully removed cart" };
  } catch (err) {
    return null;
  }
};

const deleteAllCart = async () => {
  try {
    await Cart.deleteMany({});
    return { message: "successfully removed all carts" };
  } catch (err) {
    return null;
  }
}

module.exports = {
  getCarts: getCarts,
  createCart: createCart,
  updateCart: updateCart,
  deletedCart: deletedCart,
  deleteAllCart: deleteAllCart,
  checkAmount: checkAmount
};
