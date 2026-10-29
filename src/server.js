
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
startServer();
