const Order = require('../models/Order');
const cartInterface = require('./cart');
const productInterface = require('./product');

const checkStock = (carts) => {
  const outOfStockCart = [];
  //check stock before place order
  carts.foreach(cart => {
    if (!cartInterface.checkAmount(cart._id)) {
      outOfStockCart.push(cart);
    }
  });
  return outOfStockCart;
};

const reduceProductAmount = (carts) => {
  //reduce product remaining
  carts.foreach(async cart => {
    try {
      let product = await productInterface.getProduct(cart.productId);
      const remaining = product.remain - cart.amount;
      product = { ...product, remain: remaining };
      await productInterface.updateProduct(product);
    } catch (err) {
      //may be manage this error another time
      console.log('cannot reduce amount of product...');
    }
  });
};

const calculateTotal = async (carts) => {
  try {
    //find price of each product and add to cart object
    const cartWithSubtotals = await carts.map( async cart => {
      const { price } = await productInterface.getProduct(cart.productId);
      const subtotal = price * cart.amount;
      const cartWithSubtotal = { ...cart, subtotal };
      return cartWithSubtotal;
    });

    //find total price by add all subtotal together
    //reducer function
    const reducer = (prev, cur) => {
      return prev + cur;
    }
    const total = cartWithSubtotals.reduce(reducer);
    return total;

  } catch (err) {
    return null;
  };
};

const createOrder = async (customerId) => {
  const customerCarts = await cartInterface.getCarts(customerId);
  const outOfStockCart = checkStock(customerCarts);
  //recheck before place order
  if (outOfStockCart) {
    return { 
      message: 'there are some products don\'t have enought quantity',
      problemCart: outOfStockCart
    };
  }
  //update product remaining
  reduceProductAmount(customerCarts);
  //calculate total money
  const totalMoney = await calculateTotal(customerCarts);

  //create order
  try {
    const newOrder = await new Order({
      customerId: customerId,
      status: 'pending',
      totalMoney: totalMoney,
      orderLine: [ ...customerCarts ]
    });
    const savedOrder = await newOrder.save();
    return savedOrder;
  } catch (err) {
    return null;
  }
};

module.exports = {
  createOrder: createOrder
};