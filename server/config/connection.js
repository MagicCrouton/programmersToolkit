require('dotenv').config({path:__dirname+'/./../../.env'}) 
const mongoose = require('mongoose');


mongoose.connect(
  process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/proToolKit',
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

module.exports = mongoose.connection;
