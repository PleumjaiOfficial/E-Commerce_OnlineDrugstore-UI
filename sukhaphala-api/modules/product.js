const Product = require('../models/Product');

//get all products
const getAllProducts = async () => {
  try {
    const products = await Product.find();
    return products;
  } catch (err) {
    return {
      type: 'FAIL',
      message: 'cannot get all products'
    };
  }
};

//get individual product
const getProduct = async (productId) => {
  try {
    const product =  await Product.findById(productId);
    return product._doc;
  } catch (err) {
    return {
      type: 'FAIL',
      productId: productId,
      message: 'cannot get this product detail'
    };
  }
};

//update product details
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

//delete product from database
const deleteProduct = async (productId) => {
  try {
    await Product.findByIdAndDelete(productId);
    return {
      type: 'SUCCESS',
      productId: productId,
      message: 'successfully removed product'
    }
  } catch (err) {
    return {
      type: 'FAIL',
      productId: productId,
      message: 'cannot delete this product'
    }
  }
}

module.exports = { 
  getAllProducts: getAllProducts,
  getProduct: getProduct, 
  updateProduct: updateProduct,
  deleteProduct: deleteProduct
}