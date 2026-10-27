import app from './app.js';
import {connectionDB} from './config/db.js';
import 'dotenv/config';



const PORT = process.env.PORT || 300;


const startServer = async() => {

    try{
        await connectionDB();

        app.listen(PORT, () => {
            console.log(`server runing in the port ${PORT}`);
        })
    }catch(err){
        console.log("Field to start server ", e.message);
        process.exit(1);
    }   
}

startServer();