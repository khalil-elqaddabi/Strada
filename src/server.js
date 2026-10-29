require("dotenv").config();
const app       = require("./app");
const connectDB = require("./config/db");
const { PORT }  = require("./config/env");

<<<<<<< HEAD
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.log("Failed to start server", err.message);
    process.exit(1);
  }
};
=======
import app from './app.js';
import Database from './config/db.js';
import 'dotenv/config';
const PORT = process.env.PORT || 300;

const database = new Database();

const startServer = async() => {

    try{
        await database.connect();

        app.listen(PORT, () => {
            console.log(`server runing in the port ${PORT}`);
        })
    }catch(err){
        console.log("Field to start server ", err.message);
        process.exit(1);
    }   
}
>>>>>>> ffe7af0f9e29cf16e86c964154e3feaa71c9354b

startServer();
