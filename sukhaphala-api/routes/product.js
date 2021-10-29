const router = require('express').Router();
const productInterface = require('../modules/product');

//get all products
router.get('/', async (req, res) => {
  try {
    const products = await productInterface.getAllProducts();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

//get individual product
router.get('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    // const specificProduct = products.find(product => product.id === productId);
    const specificProduct = await productInterface.getProduct(productId);
    res.status(200).json(specificProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await productInterface.deleteProduct(productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;