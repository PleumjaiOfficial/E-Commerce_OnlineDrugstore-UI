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
    res.cookie('token', loggedInUser.token, {httpOnly: true});
    res.status(200).json(loggedInUser);
  }

});

router.get('/logout', (req, res) => {
  // const result = authenInterface.logout();
  res.clearCookie('token');
  res.status(200).json({
    type: 'SUCCESS'
  })
})

module.exports = router;