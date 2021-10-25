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

Main().catch(err => console.log(err));
async function Main() {
  //connect database
  try {
    await mongoose.connect(url);
    console.log('Connected correctly to server');
  } catch (error) {
    console.log('Failed to connected');
  }

  //create model
  const Order = mongoose.model('Order', orderSchema);

  //delete all documents
  try {
    await Order.deleteMany({});
    console.log('delete correctly');
  } catch (error) {
    console.log('fail to delete');
  }
  
}