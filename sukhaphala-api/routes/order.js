const router = require('express').Router();
const customerInterface = require('../modules/order');

router.get('/placeorder', async (req, res) => {
  const customerId = '6170242430c0c7d0539f8610';
  try {
    const placedOrder = await customerInterface.placeorder(customerId);
    res.status(200).json(placedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;