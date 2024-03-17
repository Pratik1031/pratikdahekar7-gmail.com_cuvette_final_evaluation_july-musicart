const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(`${process.env.MONGOCOMPASS}`);
    console.log("DataBase Connected Sucessfully");
  } catch (error) {
    console.error("Connection Databade Error", error);
  }
};

module.exports = connectDB;
