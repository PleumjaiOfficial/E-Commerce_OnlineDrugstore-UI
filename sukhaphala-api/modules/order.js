const { Promise } = require('mongoose');
const Order = require('../models/Order');
const cartInterface = require('./cart');
const productInterface = require('./product');

const checkProductAmount = async (productId, amount) => {
  const product = await productInterface.getProduct(productId);
  if (product.remain >= amount) {
    return true;
  } else {
    return false;
  }
};

const checkStock = async (carts) => {
  let outOfStockCart = [];
  //check stock before place order
  //there is an error with promise when use with forEach
  // await Promise.all(carts.forEach( async cart => {
  //   const isEnough = await checkProductAmount(cart.productId, cart.amount);
  //   if (!isEnough) {
  //     outOfStockCart.push(cart);
  //   }
  // }));
  let i;
  for (i=0; i<carts.length; i++) {
    const isEnough = await checkProductAmount(carts[i].productId, carts[i].amount);
    if (!isEnough) {
      outOfStockCart.push(carts[i]);
    }
  }
  // console.log(outOfStockCart);
  return outOfStockCart;
};

const reduceProductAmount = (carts) => {
  //reduce product remaining
  carts.forEach(async cart => {
    try {
      let product = await productInterface.getProduct(cart.productId);
      const remaining = product.remain - cart.amount;
      product = { ...product, remain: remaining };
      await productInterface.updateProduct(product._id, product);
    } catch (err) {
      //may be manage this error another time
      console.log(err);
      console.log('cannot reduce amount of product...');
    }
  });
};

const calculateTotal = async (carts) => {
  try {
    //find price of each product and add to cart object
    const cartWithSubtotals = await Promise.all(carts.map( async cart => {
      const { price } = await productInterface.getProduct(cart.productId);
      const subtotal = price * cart.amount;
      // const cartWithSubtotal = { ...cart, subtotal };
      // return cartWithSubtotal;
      return subtotal;
    }));

    //find total price by add all subtotal together
    //reducer function
    const reducer = (prev, cur) => {
      return prev + cur;
    }
    // console.log(cartWithSubtotals);
    const total = await cartWithSubtotals.reduce(reducer);
    return total;

  } catch (err) {
    return null;
  };
};

const createOrder = async (order) => {
  //recheck before place order
  const outOfStockCart = await checkStock(order);
  if (outOfStockCart.length > 0) {
    return { 
      type: 'FAIL',
      message: 'there are some products don\'t have enought quantity',
      problemCart: outOfStockCart
    };
  }

  //calculate total money
  const totalMoney = await calculateTotal(order);
  //create order
  let savedOrder;
  const orderLine = order.map(orderItem => {
    return {
      productId: orderItem.productId,
      amount: orderItem.amount
    };
  });
  // console.log(orderLine);
  try {
    const newOrder = await new Order({
      customerId: order[0].customerId,
      status: 'pending',
      totalMoney: totalMoney,
      orderLine: orderLine
    });
    savedOrder = await newOrder.save();
  } catch (err) {
    //do something
    // console.log(err);
    savedOrder = null;
  }
  
  if (savedOrder) {
    //update product remaining
    reduceProductAmount(order);
    const result = await cartInterface.deleteAllCustomerCart(order[0].customerId);
    if (result.type === 'SUCCESS') {
      return savedOrder;
    } else {
      return {
        type: 'FAIL',
        message: 'success created order, but cannot delete carts',
        ...savedOrder
      }
    }
  } else {
    return {
      type: 'FAIL',
      message: 'cannot create order'
    }
  }

};

module.exports = {
  createOrder: createOrder
};