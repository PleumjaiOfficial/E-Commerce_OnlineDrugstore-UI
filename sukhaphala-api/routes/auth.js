const router = require('express').Router();
const authenInterface = require('../modules/authen');

//register
router.post('/register', async (req, res) => {
  const newCustomer = req.body;
  //check if there is no email and password
  if (!(newCustomer.password && newCustomer.email)) {
    res.status(400).json({
      type: 'FAIL',
      message: 'cannot leave email and password blank'})
  }

  const registedCustomer = await authenInterface.register(newCustomer);
  if (registedCustomer.type === 'FAIL') {
    //fail to register
    res.status(400).json(registedCustomer);
  } else {
    //register successful
    res.status(200).json(registedCustomer);
  }
});

//login
router.post('/login', async (req, res) => {
  const credential = req.body;
  //check if there is no email and password
  if (!(credential.password && credential.email)) {
    res.status(400).json({
      type: 'FAIL',
      message: 'cannot leave email and password blank'})
  }

  const loggedInUser = await authenInterface.login(credential);
  if (loggedInUser.type === 'FAIL') {
    res.status(401).json(loggedInUser);
  } else {
    // res.cookie('token', loggedInUser.token, {httpOnly: true});
    res.status(200).json(loggedInUser);
  }

});

module.exports = router;