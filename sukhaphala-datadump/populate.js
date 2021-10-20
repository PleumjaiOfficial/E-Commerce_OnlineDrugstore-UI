const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const orderSchema = new mongoose.Schema({
  _id: mongoose.Types.ObjectId,
  customer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  }, 
  update_time: {
    type: Date,
    default: Date.now(),
  },
  status: String, //inCart, orderPlaced, purchased, cancel
  total_money: Number,
  order_line: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Product'
      }, 
      amount: Number
    }
  ]
});
const Order = mongoose.model('Order', orderSchema);

const customerSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  firstName: String,
  lastName: String,
  username: String,
  password: String, //simplify with string
  email: String,
  phone: String,
  address:{
    location: String,
    district: String,
    country: String,
    postcode: Number
  }
});
const Customer = mongoose.model('Customer', customerSchema);

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  image: String,
  description: String,
  price: Number,
  remain: Number,
  health_goal: [String]
});
const Product = mongoose.model('Product', productSchema);

const custdoc = new Customer({
  _id: new mongoose.Types.ObjectId(),
  firstName: 'Joe',
  lastName: 'Goldberg',
  username: 'Will',
  password: 'LOVE is love', 
  email: 'books@cages.com',
  phone: '0147852369',
  address:{
    location: 'everywhere',
    district: 'California',
    country: 'US',
    postcode: '11111'
  }
});

const proddoc = new Product({
  _id: new mongoose.Types.ObjectId(),
  name: 'test pills',
  image: 'http://localhost:5000/images/testpill.jpg',
  description: 'test is test',
  price: 320,
  remain: 100,
  health_goal: ['nobrainer']
});

const orderdoc = new Order({
  _id: new mongoose.Types.ObjectId(),
  customer: custdoc._id,
  status: 'inCart',
  total_money: 100,
  order_line: {
    product: proddoc._id,
    amount: 2
  }
});

Main().catch(err => console.log(err));

async function Main(){
  //connect database
  try {
    await mongoose.connect(url);
    console.log('Connected correctly to server');
  } catch (error) {
    console.log('Failed to connected');
  }

  // //saving lefs test
  // await custdoc.save();
  // await proddoc.save();
  // try{
  //   await orderdoc.save();
  // }catch(error){
  //   console.log('saving lefs complete');
  // }

  //population
  Order.
    findOne({ status: 'inCart'}).
    populate('customer').
    exec(function (err, order) {
      if (err) return handleError(err);
      console.log('The customer is %s', order.customer.firstName);
    });




}

