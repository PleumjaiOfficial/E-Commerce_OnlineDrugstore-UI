const mongoose = require('mongoose');
const dotenv = require('dotenv');
//const Customer = require('./customer');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const orderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId, ref: 'Customer'
  }, 
  updatetime: {
    type: Date,
    default: Date.now(),
  },
  status: String, //inCart and orderPlaced
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

// const dumpData = [{
//   customer_id: 123456789, 
//   order_status: 'cart',
//   total_money: 1000,
//   order_line: [
//     {
//       product_id: 321,
//       amount: 1
//     },
//     {
//       product_id: 322,
//       amount: 3
//     }
//   ]
// }];

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

  //Customer.findOne({firstname: 'Joruno'})

  // //create document
  // try{
  //   Order.create(dumpData);
  //   console.log('create correctly');
  // }catch(error){
  //   console.log('failed to create');
  // }

   

}
