const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = express();
const productAPI = require('./routes/product');

dotenv.config();
const url = `mongodb+srv://winnr:${process.env.DB_PASSWORD}@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority`

//connect to the database
try {
  mongoose.connect(url);
  console.log('Connected correctly to server');
} catch (error) {
  console.log('Failed to connected');
}






app.use('/products', productAPI);

//start running application's backend
app.listen(process.env.PORT || 5000, () => {
  console.log('App\'s backend is running... ');
}) 