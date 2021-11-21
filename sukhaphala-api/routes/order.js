const router = require('express').Router();
const orderInterface = require('../modules/order');
const verifyMiddleware = require('../middlewares/verifyToken');

router.post('/', verifyMiddleware.orderAuthorization, async (req, res) => {
  //order is the list of carts
  const order = req.body;
  if (order.length > 0) {
    try {
      const placedOrder = await orderInterface.createOrder(order);
      res.status(200).json(placedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  } else {
    //if order is empty send back the error
    res.status(500).json({
      type: 'FAIL',
      message: 'order cannot be empty'
    });
  } 
  
});

module.exports = router;