const mongoose = require('mongoose');
let connection = {};
async function connectMongo() {
  //If connection already established then return
  if (connection.isConnected) {
    return;
  } else {
    //Create a connection
    const options = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      maxPoolSize: 10,
    };
    const db = await mongoose.connect(process.env.MONGO_URI, options);
    connection.isConnected = db.connections[0].readyState;
  }
}
module.exports = connectMongo;
