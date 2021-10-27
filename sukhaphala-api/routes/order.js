const router = require('express').Router();
const orderInterface = require('../modules/order');

router.post('/', async (req, res) => {
  const customerId = '6170242430c0c7d0539f8610';
  //order is the list of carts
  const order = req.body;
  if (order) {
    try {
      const placedOrder = await orderInterface.createOrder(order);
      res.status(200).json(placedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    res.status(500).json({
      type: 'FAIL',
      message: 'order cannot be empty'
    });
  } 
  
});

module.exports = router;