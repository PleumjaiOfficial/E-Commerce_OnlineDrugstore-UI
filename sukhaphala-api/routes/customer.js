const router = require('express').Router();
const customerInterface = require('../modules/customer');
const verifyMiddleware = require('../middlewares/verifyToken');

//get detail about the user 
router.get('/:id', verifyMiddleware.customerAuthorization, async (req, res) => {
  try {
    const customerId = req.params.id
    const {password, ...others} = await customerInterface.getCustomer(customerId);
    res.status(200).json(others);
  } catch (err) {
    req.status(500).json(err);
  }
});

module.exports = router;