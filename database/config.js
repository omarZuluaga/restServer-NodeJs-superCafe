const mongoose = require('mongoose');


const dbConnection = async() => {

  try {
    
    await mongoose.connect( process.env.MONGODB_ATLAS, {
      useNewUrlParser: true
    });

    console.log('Db online');

  } catch (error) {
    console.log("🚀 ~ file: config.js:9 ~ dbConnection ~ error:", error)
    throw new Error('Error trying to up the database');
  }
}

module.exports = {
  dbConnection
};