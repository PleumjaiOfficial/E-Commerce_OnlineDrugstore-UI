const express = require('express');
const app = express();
const productAPI = require('./routes/product');










app.use('/products', productAPI);

//start running application's backend
app.listen(process.env.PORT || 5000, () => {
  console.log('App\'s backend is running... ');
}) 