const Product = require('../models/Product');

const getProduct = async (productId) => {
  try {
    const product =  await Product.findById(productId);
    return product;
  } catch (err) {
    return null;
  }
};

const updateProduct = async (productId, product) => {
  try {
    const updatedProduct = await Product.findByIdAndUpdate(productId, 
      { ...product },
      { new: true });
    return updatedProduct;
  } catch (err) {
    return null;
  }
};

module.exports = { 
  getProduct: getProduct, 
  updateProduct: updateProduct 
}