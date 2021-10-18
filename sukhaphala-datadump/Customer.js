const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const customerSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  password: String, //simplify with string
  email: String,
  phone: String,
  address: [
    {
      location: String,
      district: String,
      country: String,
      postcode: Number
    }
  ]
});

const dumpData = [{
  firstName: 'Joruno',
  lastName: 'Jobana',
  username: 'Gold Stand',
  password: 'password123',
  email: 'mudamudamuda@ororaora.com',
  phone: '0123456789',
  address: 
    {
      location: 'nowhere',
      district: 'Venice',
      country: 'Italy',
      postcode: 12345
    }
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

  //delete all documents
  try{
    await Customer.deleteMany({});
    console.log('delete correctly');
  }catch(error){
    console.log('fail to delete');
  }
  
  //create document
  try{
    Customer.create(dumpData);
    console.log('create correctly');
  }catch(error){
    console.log('failed to create');
  }
}