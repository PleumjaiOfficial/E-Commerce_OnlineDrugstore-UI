const Order = require('../models/Order');
const cartInterface = require('./cart');
const productInterface = require('./product');

//check all product amount for each cart
const checkStock = async (carts) => {
  let outOfStockCart = [];
  let i;
  for (i=0; i<carts.length; i++) {
    const isEnough = await cartInterface.checkAmount(carts[i].productId, carts[i].amount);
    if (!isEnough) {
      outOfStockCart.push(carts[i]);
    }
  }
  //return the list os cart that contains not enough product in the stock
  return outOfStockCart;
};

//reduce product amount in the stock base on order 
const reduceProductAmount = (carts) => {
  //reduce product remaining of each cart
  carts.forEach(async cart => {
    try {
      let product = await productInterface.getProduct(cart.productId);
      const remaining = product.remain - cart.amount; //subtract the amount in database with those from the cart
      product = { ...product, remain: remaining };
      await productInterface.updateProduct(product._id, product); //update the cart with new amount
    } catch (err) {
      throw {
        type: 'FAIL',
        message: 'Cannot reduce the amount of some products'
      }
    }
  });
};

//calculate total amount off the order
const calculateTotal = async (carts) => {
  try {
    //find price of each product and add to cart object
    const cartWithSubtotals = await Promise.all(carts.map( async cart => {
      const { price } = await productInterface.getProduct(cart.productId);
      const subtotal = price * cart.amount;
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
    throw {
      type: 'FAIL',
      message: 'Cannot calculate the totol amount of order.'
    }
  };
};

//main function for create order
const createOrder = async (order) => {
  //recheck before place order
  const outOfStockCart = await checkStock(order);
  if (outOfStockCart.length > 0) {
    throw { 
      type: 'FAIL',
      message: 'there are some products don\'t have enought quantity',
      problemCart: outOfStockCart
    };
  }

  //calculate total money
  const totalMoney = await calculateTotal(order);
  //start create order
  //create order line
  let savedOrder;
  const orderLine = order.map(orderItem => {
    return {
      productId: orderItem.productId,
      amount: orderItem.amount
    };
  });

  //try to save order to database
  try {
    const newOrder = await new Order({
      customerId: order[0].customerId,
      status: 'pending',
      totalMoney: totalMoney,
      orderLine: orderLine
    });
    savedOrder = await newOrder.save();
  } catch (err) {
    throw {
      type: 'FAIL',
      message: 'Cannot save the order to the database.'
    }
  }
  
  //update product remaining
  reduceProductAmount(order);
  //delete all cart that are used to create the order
  const result = await cartInterface.deleteAllCustomerCart(order[0].customerId);
  
  return savedOrder;

};

module.exports = {
  createOrder: createOrder
};