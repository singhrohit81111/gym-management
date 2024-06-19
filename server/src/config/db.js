const mongoose = require("mongoose");
const { DB_NAME } = require("../constants");

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
    console.log("connected succesfully to databse");
  } catch (error) {
    console.log("error occured while connecting to database");
  }
};

module.exports = connectDB;
