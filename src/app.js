import express from 'express';
import DepartureRoutes from './modules/departures/routes/departure.routes.js';


const app = express();


app.use(express.json());


// ici on va declaerer les routes pour chaque module 
//exemple departure 
app.use("/api/departure", DepartureRoutes);

app.get("/test", (req, res) => {
    return res.send({message: "testing routes "});
})

export default app;
