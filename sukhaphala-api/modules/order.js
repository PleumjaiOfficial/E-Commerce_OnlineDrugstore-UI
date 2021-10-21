const OrderLine = require('../models/OrderLine');

const addOrderLine = async (orderLine) => {
  try {
    const newCart = new OrderLine ({
      customerId: orderLine.customerId,
      productId: orderLine.productId,
      amount: orderLine.amount
    });

    return await newCart.save();
  } catch (err) {
    return err;
  };
};

module.exports = { addOrderLine: addOrderLine };