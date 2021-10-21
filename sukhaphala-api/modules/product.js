const Product = require('../models/Product');

const getProduct = async (productId) => {
  try {
    const product =  await Product.findById(productId);
    return product;
  } catch (err) {
    return null;
  }
};

module.exports = { getProduct: getProduct }