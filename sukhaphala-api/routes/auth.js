const router = require('express').Router();
const authenInterface = require('../modules/authen');

//register
router.post('/register', async (req, res) => {
  const newCustomer = req.body;
  console.log(newCustomer);
  var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  //check if there is no email and password
  if (!(newCustomer.password && newCustomer.email)) {
    res.status(400).json({
      type: 'FAIL',
      message: 'cannot leave email and password blank'})
  //pleum add this
  } else if (!(newCustomer.firstname && newCustomer.lastname)) {
    res.status(400).json({
      type: 'FAIL',
      message: 'cannot leave firstname and lastname'})
  } else if(!(newCustomer.email.match(mailformat))){
     res.status(400).json({
      type: 'FAIL',
      message: 'email is not define'})
  } else if(!(newCustomer.phone)){
    res.status(400).json({
      type: 'FAIL',
      message: 'cannot leave phone contact'})
  }
  
  



  const registedCustomer = await authenInterface.register(newCustomer);
  if (registedCustomer.type === 'FAIL') {
    //fail to register
    res.status(400).json(registedCustomer);
  } else {
    //register successful
    res.status(200).json(registedCustomer);
  } catch (err) {
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