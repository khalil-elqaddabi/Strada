const mongoose    = require("mongoose");
const { MONGODB_URI } = require("./env");

async function connectDB() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("Error connecting to database", err.message);
    throw err;
  }
}

module.exports = connectDB;
