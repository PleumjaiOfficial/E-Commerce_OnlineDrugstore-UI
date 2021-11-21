const router = require('express').Router();
const authenInterface = require('../modules/authen');

//register
router.post('/register', async (req, res) => {
  const newCustomer = req.body;
  console.log(newCustomer);
  try {
    const registedCustomer = await authenInterface.register(newCustomer);
    res.status(200).json(registedCustomer);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
});

//login
router.post('/login', async (req, res) => {
  const credential = req.body;
  try {
    const loggedInUser = await authenInterface.login(credential);
    res.cookie('token', loggedInUser.token, { maxAge: 86400000, httpOnly: true}); //maxAge calculation: 1d = 1 * 24 * 60 * 60 * 1000 ms
    res.status(200).json(loggedInUser);
  } catch (err) {
    res.status(401).json(err);
  }
});

router.get('/logout', (req, res) => {
  res.clearCookie('token');
  res.status(200).json({
    type: 'SUCCESS'
  })
})

module.exports = router;