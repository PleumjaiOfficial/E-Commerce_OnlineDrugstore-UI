const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

const productSchema = new mongoose.Schema({
  name: String,
  image: {
    type: String,
    default: 'http://localhost:5000/images/default-image.jpg'
  },
  description: String,
  price: Number,
  remain: Number,
  healthGoal: [String]
});

const dummyProduct = [
  {
    name: 'Asparagus Distill',
    image: 'http://localhost:5000/images/asparagus.png',
    description: `Certain compounds in asparagus are metabolized to yield ammonia 
                  and various sulfur-containing degradation products, 
                  including various thiols and thioesters,which give urine a characteristic smell.`,
    price: 569,
    remain: 648,
    healthGoal: ['Brain', 'Stress', 'Skin']
  },
  {
    name: 'Mixberry Distill',
    image: 'http://localhost:5000/images/mixberry.png',
    description: `Berries tend to have a good nutritional profile. 
                  They’re typically high in fiber, vitamin C, 
                  and antioxidant polyphenols.`,
    price: 375,
    remain: 115,
    healthGoal: ['Digestion', 'Skin']
  },
  {
    name: 'Matrix Pills (Red Pill and Blue Pill)',
    image: 'http://localhost:5000/images/matrix.png',
    description: `The terms "red pill" and "blue pill" refer to a choice between 
                  the willingness to learn a potentially unsettling or life-changing truth 
                  by taking the red pill or remaining in contented ignorance with the blue pill.`,
    price: 740,
    remain: 232,
    healthGoal: ['Immunity', 'Brain']
  },
  {
    name: 'Mix Nutrient',
    image: 'http://localhost:5000/images/nutrient.png',
    description: `Good nutrition is one of the keys to a healthy life. 
                  You can improve your health by keeping a balanced diet. 
                  You should eat foods that contain vitamins and minerals.`,
    price: 60,
    remain: 843,
    healthGoal: ['Joints', 'Eyes', 'Fitness']
  },
  {
    name: 'Super Pills',
    image: 'http://localhost:5000/images/super.png',
    description: `This pill is masterful pill. It can solve almost all problem.`,
    price: 520,
    remain: 760,
    healthGoal: ['Joints', 'Heart', 'Fitness', 'Immunity', 'Skin']
  },
  {
    name: 'Milky Way Pills',
    image: 'http://localhost:5000/images/milky.png',
    description: `Milk is an excellent source of vitamins and minerals, including “nutrients of concern,” 
                  which are under-consumed by many populations. It provides potassium, B12, calcium and vitamin D, 
                  which are lacking in many diets. Milk is also a good source of vitamin A, magnesium, zinc and thiamine.`,
    price: 64,
    remain: 587,
    healthGoal: ['Bones']
  },
  {
    name: 'Compound Mineral',
    image: 'http://localhost:5000/images/mineral.png',
    description: `Minerals are important for your body to stay healthy. 
                  Your body uses minerals for many different jobs, including keeping your bones, muscles, heart, 
                  and brain working properly. Minerals are also important for making enzymes and hormones.`,
    price: 250,
    remain: 734,
    healthGoal: ['Immunity', 'Prenatol', 'Brain']
  },
  {
    name: 'Teachala Pills',
    image: 'http://localhost:5000/images/tea.png',
    description: `Tea, especially green tea, is a rich source of flavonoids, bioactive compounds that can lessen oxidative stress, 
                  relieve inflammation, and provide other health benefits.`,
    price: 550,
    remain: 300,
    healthGoal: ['Eyes', 'Hair']
  },
  {
    name: 'Matrix Pills 2',
    image: 'http://localhost:5000/images/matrix2.png',
    description: `The terms "red pill" and "blue pill" refer to a choice between the willingness to learn a potentially unsettling or 
                  life-changing truth by taking the red pill or remaining in contented ignorance with the blue pill. 
                  This is new version "resurrect pill".`,
    price: 444,
    remain: 400,
    healthGoal: ['Immunity', 'Brain', 'Sleep']
  },
  {
    name: 'Vitamin C',
    image: 'http://localhost:5000/images/vitaminc.png',
    description: `Vitamin C (also known as ascorbic acid and ascorbate) is a vitamin found in various foods and sold as a dietary supplement. 
                  It is used to prevent and treat scurvy. Vitamin C is an essential nutrient involved in the repair of tissue, 
                  the formation of collagen, and the enzymatic production of certain neurotransmitters.`,
    price: 45,
    remain: 505,
    healthGoal: ['Digestion']
  }
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

  //create multiple documents
  try{
    Product.create(dummyProduct);
    console.log('create correctly');
  }catch(error){
    console.log('failed to create');
  }
}