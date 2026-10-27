import mongoose from 'mongoose';


export const connectionDB = async() => {

    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connection success");
    }catch(err){
        console.log("Error Connetion with database", err.message);
        throw err;
    }   
}


