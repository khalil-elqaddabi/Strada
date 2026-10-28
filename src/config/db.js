
import mongoose from 'mongoose';

class Database {
        static instance;

        constructor() {
          if (Database.instance) {
            return Database.instance
          }
          this.uri = process.env.MONGODB_URI
          this.connectionPromise = null;
        
          Database.instance = this;
        }
      
        async connect() {
        
              if(mongoose.connection.readyState === 1){
                return mongoose.connection; 
              }
            
              if(!this.connectionPromise){
                  this.connectionPromise = mongoose.connect(this.uri)
                    .then(() => {
                        console.log("Connexion au base de donnee reussie ")
                        return mongoose.connection;
                    }).catch((err) => {
                        this.connectionPromise = null;
                        throw err;
                    })
              }
        }
}     

export default Database;

