const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const jwtToken = req.cookies.token; //read token from cookie
  if (!jwtToken) {
    //if no token in the cookie
    res.status(401).json({
      type: 'FAIL',
      message: 'please authenticate first'
    }); 
  } else {
    //verify token
    jwt.verify(jwtToken, process.env.JWT_SECRET, (err, customer) => {
      //if token is not valid
      if (err) {
        res.status(403).json({
          type: 'FAIL',
          message: 'token is invalid'
        });
      }
      //set request payload of customer with customerId and isAdmin
      req.customer = customer;
      next();
    });
  }
};

//customer authorization
const customerAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.customer.id === req.params.id) {
      next();
    } else {
      res.status(403).json({
        type: 'FAIL',
        message: 'authorization failed'
      });
    }
  })
}

//cart authorization check that user is the owner of that cart
const cartAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.customer.id === req.body.customerId || req.customer.id === req.params.id) {
      next();
    } else {
      res.status(403).json({
        type: 'FAIL',
        message: 'authorization failed'
      });
    }
  })
};

//order authorization check that user is the owner of those carts
const orderAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    //check if the owner of that cart is match with the customer who do this action
    const notMatchCustomerId = req.body.filter(cart => cart.customerId !== req.customer.id);
    if (notMatchCustomerId.length === 0) {
      next();
    } else {
      res.status(403).json({
        type: 'FAIL',
        message: 'authorization failed'
      });
    }
  });
};

//admin authorization now check that only admin can manipulate products 
const adminAuthorization = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.customer.isAdmin) {
      next();
    } else {
      res.status(403).json({
        type: 'FAIL',
        message: 'authorization failed'
      });
    }
  })
};

module.exports = {
  verifyToken: verifyToken,
  customerAuthorization: customerAuthorization,
  cartAuthorization: cartAuthorization,
  orderAuthorization: orderAuthorization,
  adminAuthorization: adminAuthorization
}