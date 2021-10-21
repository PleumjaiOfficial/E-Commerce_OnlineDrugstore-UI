const router = require('express').Router();
const customerInterface = require('../modules/customer');

router.post('/', async (req, res) => {
  try {
    const customerId = '6170242430c0c7d0539f8610';
    const wantedProduct = req.body;

    const newCart = await customerInterface.addProductToCart(wantedProduct, customerId);
    if (newCart) {
      res.status(200).json(newCart);
    } else {
      res.status(500).json({message: 'failed to add cart'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
