const mongoose = require('mongoose');
const url = 'mongodb+srv://winnr:4myteam@cluster0.95dro.mongodb.net/sukhapala?retryWrites=true&w=majority'

function database() {
  //connect mongodb with mongoose
  try {
    mongoose.connect(url);
    console.log("Connected correctly to server");
  } catch (error) {
    console.log("Failed to connected");
  }

}


