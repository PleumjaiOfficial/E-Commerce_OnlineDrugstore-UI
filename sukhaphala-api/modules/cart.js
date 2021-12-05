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
    //add product name and image to display on cart lists page
    const detailedCarts = await Promise.all(carts.map(async cart => {
      const { name, image } = await productInterface.getProduct(cart.productId);
      cart = cart._doc;
      cart.name = name;
      cart.image = image;
      return cart;
    }));
    return detailedCarts;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot get this cart from database.'
    }
  }
};

//get individual cart
const getCart = async (cartId) => {
  try {
    const cart = await Cart.findById(cartId);
    return cart._doc;
  } catch (err) {
    throw {
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
    const isEnough = await checkAmount(cart.productId, cart.amount);
    if (isEnough) {
      const newCart = await Cart.findOneAndUpdate(
        { productId: cart.productId },
        {
          customerId: cart.customerId,
          productId: cart.productId,
          price: cart.price,
          amount: cart.amount,
        },
        { new: true, upsert: true} //set upsert true to create new one if the cart is not exist before
      );
      //add name and image of product to display on cart lists page
      const { name, image } = await productInterface.getProduct(newCart.productId);
      const detailedNewCart = {
        ...newCart._doc,
        name: name,
        image: image
      }
      return detailedNewCart;
    } else {
      //product amount in DB is not enough
      throw {
        type: 'FAIL',
        message: 'this product doesn\'t have enough amount'
      }
    }
  } catch (err) {
    throw err;
  }
}

//update cart
const updateCart = async (cartId, cart) => {
  try {
    //replace the cart with new data
    const updatedCart = await Cart.findByIdAndUpdate(
      cartId,
      {
        ...cart
      },
      { new: true }
    );
    //if amount of that product in cart is 0, this cart should be deleted
    if (updatedCart.amount === 0) {
      await Cart.findByIdAndDelete(updatedCart._id);
    }
    return updatedCart;
  } catch (err) {
    throw {
      type: 'FAIL',
      message: `fail to update this cart: cart id (${cartId})`
    }
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
    throw {
      type: 'FAIL',
      message: `Cannot delete this cart from database: cart id (${cartId})`
    }
  }
};

//delete all carts of particular customer
const deleteAllCustomerCart = async (customerId) => {
  try {
    await Cart.deleteMany({customerId: customerId});
    return {
      type: 'SUCCESS', 
      message: 'successfully removed all carts' 
    };
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot delete all carts.'
    }
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
