const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

const app = express();
const productAPI = require('./routes/product');
const cartAPI = require('./routes/cart');
const orderAPI = require('./routes/order');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

//connect to the database
try {
  mongoose.connect(url);
  console.log('Connected correctly to server');
} catch (error) {
  console.log('Failed to connected');
}


app.use(cors());
app.use(express.json({ limit: 2097152 }))
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/products', productAPI);
app.use('/carts', cartAPI);
app.use('/orders', orderAPI);

//start running application's backend
app.listen(process.env.PORT || 5000, () => {
  console.log('App\'s backend is running... ');
}) 