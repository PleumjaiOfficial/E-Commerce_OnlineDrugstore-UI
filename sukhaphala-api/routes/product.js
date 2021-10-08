const router = require('express').Router();

//test data. delete this when integrated with database
const products = require('../data_test/products');

//get all products
router.get('/', (req, res) => {
  try {
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get individual product
router.get('/:id', (req, res) => {
  try {
    const productId = req.params.id;
    const specificProduct = products.find(product => product.id === productId);
    
    res.status(200).json(specificProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;