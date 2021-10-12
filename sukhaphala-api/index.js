const express = require('express');
const app = express();
const productAPI = require('./routes/product');

const url = 'mongodb+srv://winnr:4myteam@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority'

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