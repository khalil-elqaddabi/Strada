import express from 'express';
import DepartureRoutes from './modules/departures/routes/departure.routes.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import errorHandler from './shared/middlewares/error.middleware.js';
import coachRoutes from "./modules/coachs/routes/coach.routes.js";
import {scopePerRequest} from 'awilix-express';
import container from './bootsrap/container.js';
import StopRoutes from './modules/stops/routes/stop.routes.js';


const app = express();
app.use(scopePerRequest(container));

app.use(express.json());

app.use("/api/auth", authRoutes);
// ici on va declaerer les routes pour chaque module 
//exemple departure 
app.use("/api/departures", DepartureRoutes);
app.use("/api/stops", StopRoutes);


app.get("/test", (req, res) => {
    return res.send({message: "testing routes "});
})

app.use("/api/coaches", coachRoutes);
app.use(errorHandler);

export default app;
