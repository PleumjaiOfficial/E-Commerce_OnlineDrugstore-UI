const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  password: String, //simplify with string
  email: String,
  phone: String,
  address: {
    location: String,
    district: String,
    country: String,
    postcode: Number
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
});

const customerData = [{
  firstName: 'John',
  lastName: 'Nothing',
  password: 'jnn36963',
  email: 'john321@gmail.com',
  phone: '0258741369',
  address: {
      location: '123/1, ASD Road',
      district: 'Thung Kru, Bangkok',
      country: 'Thailand',
      postcode: 10140
  }
}];

const adminData = [{
  firstName: 'nimda',
  lastName: 'qwerty',
  password: 'alwaysadmin',
  email: 'nimda@sukha.com',
  phone: '0123654789',
  address: {
      location: 'ABC House, DEF Road',
      district: 'Thung Kru, Bangkok',
      country: 'Thailand',
      postcode: 10140
  },
  isAdmin: true
}];

Main().catch(err => console.log(err));

async function Main(){
  //connect database
  try {
    await mongoose.connect(url);
    console.log('Connected correctly to server');
  } catch (error) {
    console.log('Failed to connected');
  }

  //create model
  const Customer = mongoose.model('Customer', customerSchema);

  // //delete all documents
  // try{
  //   await Customer.deleteMany({});
  //   console.log('delete correctly');
  // }catch(error){
  //   console.log('fail to delete');
  // }
  
  //create document
  try{
    Customer.create(customerData);
    Customer.create(adminData);
    console.log('create correctly');
  }catch(error){
    console.log('failed to create');
  }
}