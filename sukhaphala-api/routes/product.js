const router = require('express').Router();
const verifyMiddleware = require('../middlewares/verifyToken');
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

//add new product
router.post('/', verifyMiddleware.adminAuthorization, async (req, res) => {
  const newProduct=  req.body;
  try {
     const savedProduct = await productInterface.addProduct(newProduct);
     res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update product details
router.put('/:id', verifyMiddleware.adminAuthorization, async (req, res) => {
  const productId = req.params.id;
  const product = req.body;
  try {
    const updatedProduct = await productInterface.updateProduct(productId, product);
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
});

//delete product
router.delete('/:id', verifyMiddleware.adminAuthorization, async (req, res) => {
  const productId = req.params.id;
  try {
    const result = await productInterface.deleteProduct(productId);
    res.status(200).json(result);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;