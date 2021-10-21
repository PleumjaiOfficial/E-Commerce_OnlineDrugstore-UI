const Customer = require('../models/Customer');
const OrderLine = require('./orderLine');

// const createCustomer = ({customer}) => {
  
// };

const addProductToCart = (wantedProduct, customer) => {
  const product = OrderLine.checkAmount(wantedProduct);

  if (product) {
     OrderLine.calculatePrice(wantedProduct, product);

  }

  
}