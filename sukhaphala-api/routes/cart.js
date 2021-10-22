const router = require('express').Router();
const customerInterface = require('../modules/customer');

router.get('/', async (req, res) => {
  const customerId = '6170242430c0c7d0539f8610';
  try {
    const carts = await customerInterface.getCustomerCarts(customerId);
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  };
});


router.post('/', async (req, res) => {
  //fix customerId tempolary
  const customerId = '6170242430c0c7d0539f8610';
  const wantedProduct = req.body;

  try {
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

router.put('/:id', async (req, res) => {
  //fix customerId temporaly
    // need object of cart
  const customerId = '6170242430c0c7d0539f8610';
  const cartId = req.params.id;
  const cart = req.body;

  try {
    const updatedCart = await customerInterface.updateProductAmountInCart(cartId, customerId, cart);
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res.status(500).json({message: 'failed to update cart'});
    }
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    try {
      const result = await customerInterface.deleteCustomerCart(cartId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
