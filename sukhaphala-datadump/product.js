const mongoose = require('mongoose');
const fs = require('fs');
const url = 'mongodb+srv://winnr:4myteam@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority';

const productSchema = new mongoose.Schema({
  name: String,
  image: {
    data: Buffer, 
    contentType: String},
  description: String,
  price: Number,
  remain: Number,
  health_goal: [String]
});

const redimgPath = './product-image/redpill.jpg';
const blueimgPath = './product-image/bluepill.png';
const blackimgPath = './product-image/blackpill.jpg';
const whiteimgPath = './product-image/whitepill.jpg';
const purpleimgPath = './product-image/purplepill.jpg';
const rainbowimgPath = './product-image/rainbowpill.jpg';

const dumpData = [
  {
    name: "red pills",
    image: {
      data:fs.readFileSync(redimgPath),
      contentType: 'image/jpeg'
    },
    description: `red is hot`,
    price: 320,
    remain: 100,
    health_goal: ["brain", "stress"],
  },
  {
    name: "blue pills",
    image: {
      data:fs.readFileSync(blueimgPath),
      contentType: 'image/png'
    },
    description: `blue is cool.`,
    price: 400,
    remain: 90,
    health_goal: ["face", "sleep"],
  },
  {
    name: "black pills",
    image: {
      data:fs.readFileSync(blackimgPath),
      contentType: 'image/jpeg'
    },
    description: `black is heavy`,
    price: 500,
    remain: 10,
    health_goal: ["power", "strength"],
  },
  {
    name: "white pills",
    image: {
      data:fs.readFileSync(whiteimgPath),
      contentType: 'image/jpeg'
    },
    description: `white is bright`,
    price: 320,
    remain: 100,
    health_goal: ["brain", "stress"],
  },
  {
    name: "purple pills",
    image: {
      data:fs.readFileSync(purpleimgPath),
      contentType: 'image/jpeg'
    },
    description: `purple is mystic `,
    price: 400,
    remain: 90,
    health_goal: ["face", "sleep"],
  },
  {
    name: "rainbow pills",
    image: {
      data:fs.readFileSync(rainbowimgPath),
      contentType: 'image/jpeg'
    },
    description: `rainbow is pride`,
    price: 500,
    remain: 10,
    health_goal: ["power", "strength"],
  },
];

main().catch(err => console.log(err));
async function main() {
  //connect database
  try {
    await mongoose.connect(url);
    console.log("Connected correctly to server");
  } catch (error) {
    console.log("Failed to connected");
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
