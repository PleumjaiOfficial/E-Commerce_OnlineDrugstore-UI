const router = require('express').Router();

const Product = require('../models/Product');

//get all products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get individual product
router.get('/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    // const specificProduct = products.find(product => product.id === productId);
    const specificProduct = await Product.findById(productId);
    res.status(200).json(specificProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;