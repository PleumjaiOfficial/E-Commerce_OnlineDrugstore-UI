const router = require('express').Router();
const cartInterface = require('../modules/cart');

//get all carts
router.get('/', async (req, res) => {
  //fix customerId tempolary
  const customerId = '6170242430c0c7d0539f8610';
  try {
    const carts = await cartInterface.getCarts(customerId);
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  };
});

//create cart api
router.post('/', async (req, res) => {
  //fix customerId tempolary
  const customerId = '6170242430c0c7d0539f8610';
  const requestCart = { 
    customerId: customerId,
    productId: req.body._id,
    price: req.body.price,
    amount: req.body.amount
  };

  try {
    const newCart = await cartInterface.createCart(requestCart);
    if (newCart) {
      res.status(200).json(newCart);
    } else {
      res.status(500).json({message: 'failed to add cart'});
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//update cart api
router.put('/:id', async (req, res) => {
  const cartId = req.params.id;
  const cart = req.body;

  try {
    const updatedCart = await cartInterface.updateCart(cartId, cart);
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res.status(500).json({
        type: 'FAIL',
        message: 'failed to update cart'
      });
    }
  } catch (err) {
    res.status(500).json(err);
  };
});

router.delete('/:id', async (req, res) => {
    const cartId = req.params.id;
    try {
      const result = await cartInterface.deleteCart(cartId);
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
