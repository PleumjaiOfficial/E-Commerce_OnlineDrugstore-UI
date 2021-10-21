const Product = require('../models/Product');

const checkAmount = async (product) => {
  try {
    const product = await Product.findById(product.productId);
    return product;
  } catch (err) {
    return null;
  }
};

const calculatePrice = (wantedProduct, product) => {
  return wantedProduct.amount * product.price;
};

module.exports = {checkAmount: checkAmount};