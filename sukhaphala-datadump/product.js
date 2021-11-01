const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const productSchema = new mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  image: String,
  description: String,
  price: Number,
  remain: Number,
  healthGoal: [String]
});

const dumpData = [
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'red pills',
    image: 'http://localhost:5000/images/redpill.jpg',
    description: 'red is hot',
    price: 320,
    remain: 100,
    healthGoal: ['brain', 'stress'],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'blue pills',
    image: 'http://localhost:5000/images/bluepill.png',
    description: 'blue is cool',
    price: 400,
    remain: 90,
    healthGoal: ['face', 'sleep'],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'black pills',
    image: 'http://localhost:5000/images/blackpill.jpg',
    description: 'black is heavy',
    price: 500,
    remain: 10,
    healthGoal: ['power', 'strength'],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'white pills',
    image: 'http://localhost:5000/images/whitepill.jpg',
    description: 'white is bright',
    price: 320,
    remain: 100,
    healthGoal: ['brain', 'stress'],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'purple pills',
    image: 'http://localhost:5000/images/purplepill.jpg',
    description: 'purple is mystic',
    price: 400,
    remain: 90,
    healthGoal: ['face', 'sleep'],
  },
  {
    _id: new mongoose.Types.ObjectId(),
    name: 'rainbow pills',
    image: 'http://localhost:5000/images/rainbowpill.jpg',
    description: 'rainbow is pride',
    price: 500,
    remain: 10,
    healthGoal: ['power', 'strength'],
  },
];

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
  const Product = mongoose.model('Product', productSchema);

  //delete all document
  try{
    await Product.deleteMany({});
    console.log('delete correctly');
  }catch(error){
    console.log('fail to delete');
  }

  //create multiple documents
  try{
    Product.create(dumpData);
    console.log('create correctly');
  }catch(error){
    console.log('failed to create');
  }
}