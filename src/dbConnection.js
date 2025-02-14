const mongoose = require("mongoose");

const connectDB = async (req, res) => {
  try {
    await mongoose.connect(process.env.DATABASE_URL);
    console.log("server conectado a mongodb");
  } catch (error) {
    console.log(error);
  }
};
module.exports = connectDB;
