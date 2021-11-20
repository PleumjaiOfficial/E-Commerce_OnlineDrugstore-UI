const router = require('express').Router();
const cartInterface = require('../modules/cart');
const verifyMiddleware = require('../middlewares/verifyToken');

//get all carts
router.get('/:id', verifyMiddleware.cartAuthorization, async (req, res) => {
  const customerId = req.params.id;
  try {
    const carts = await cartInterface.getCustomerCarts(customerId);
    res.status(200).json(carts);
  } catch (err) {
    res.status(500).json(err);
  };
});

//create cart api
router.post('/', verifyMiddleware.verifyToken, async (req, res) => {
  const customerId = req.customer.id;
  const requestCart = { 
    customerId: customerId,
    productId: req.body._id,
    price: req.body.price,
    amount: req.body.amount
  };

  try {
  //   const newCart = await cartInterface.createCart(requestCart);
  //   if (newCart) {
  //     res.status(200).json(newCart);
  //   } else {
  //     res.status(500).json({message: 'failed to add cart'});
  //   }
  // } catch (err) {
  //   res.status(500).json(err);
    const newCart = await cartInterface.createCart(requestCart);
    res.status(200).json(newCart);
  } catch (err) {
    res.status(500).json(err);
  }
});

//update cart api
router.put('/:id', verifyMiddleware.cartAuthorization ,async (req, res) => {
  const cartId = req.params.id;
  const cart = req.body;

  try {
    const updatedCart = await cartInterface.updateCart(cartId, cart);
    // if (updatedCart) {
    //   res.status(200).json(updatedCart);
    // } else {
    //   res.status(500).json({
    //     type: 'FAIL',
    //     message: 'failed to update cart'
    //   });
    //}
    res.status(200).json(updatedCart);
  } catch (err) {
    res.status(500).json(err);
  };
});

//delete customer cart api
//if have a time, please find the way to make authorization in middleware 
router.delete('/:id', verifyMiddleware.verifyToken, async (req, res) => {
    const cartId = req.params.id;
    const customerId = req.customer.id;
    try {
      const targetCart = await cartInterface.getCart(cartId);
      if (targetCart.customerId.toString() === customerId){
        const result = await cartInterface.deleteCart(cartId);
        res.status(200).json(result);
      } else {
        res.status(403).json({
          type: 'FAIL',
          message: 'authorization failed'
        });
      }
    } catch (err) {
      res.status(500).json(err);
    }
});

module.exports = router;
