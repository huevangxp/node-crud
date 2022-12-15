const mongoose = require("mongoose");
require("dotenv").config();
const URI = process.env.MONGO_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(
      URI,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    ).then(() => {
      console.log("MongoDB Connected");
    })
  } catch (error) {
    console.log(error);
  }
};

module.exports = connectDB;
