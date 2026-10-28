
import mongoose from 'mongoose';

class  Database{

  constructor(){
    this.uri = process.env.MONGODB_URI
  }

  async  connect(){
    try{
      await mongoose.connect(this.uri)
      console.log('la connexion se fait avec succes');
    }catch(err){
      console.log("Erreur lorsque la connexion avec la base de donnee ", err.message);
      throw err
    }
  }
}

export default Database;

