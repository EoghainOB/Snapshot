const mongoose = require("mongoose");
require('dotenv').config()

async function connect() {
  try {
    await mongoose.connect(process.env.MONGO_DB_URI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error(error);
  }
}

module.exports = connect;
