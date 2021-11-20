const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const app = express();
const authAPI = require('./routes/auth');
const productAPI = require('./routes/product');
const cartAPI = require('./routes/cart');
const orderAPI = require('./routes/order');
const healthGoalAPI = require('./routes/healthGoal');
const customerAPI = require('./routes/customer');

dotenv.config();
const url = process.env.DB_URL;

//connect to the database
try {
  mongoose.connect(url);
  console.log('Connected correctly to database');
} catch (err) {
  console.log('Failed to connected');
}


const origin = "http://localhost:3000" 

app.use(
  cors({
    credentials: true,
    origin
  }))

app.use(express.json({ limit: 2097152 }))
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(cookieParser());
app.use('/auth', authAPI)
app.use('/products', productAPI);
app.use('/carts', cartAPI);
app.use('/orders', orderAPI);
app.use('/healthgoals', healthGoalAPI);
app.use('/customers', customerAPI);


//start running application's backend
app.listen(process.env.PORT || 5000, () => {
  console.log('App\'s backend is running... ');
}) 