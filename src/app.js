import express from 'express';
import DepartureRoutes from './modules/departures/routes/departure.routes.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import errorHandler from './shared/middlewares/error.middleware.js';
import {scopePerRequest} from 'awilix-express';
import container from './bootsrap/container.js';
import StopRoutes from './modules/stops/routes/stop.routes.js';


const app = express();
app.use(scopePerRequest(container));

app.use(express.json());
//auth
app.use("/api/auth", authRoutes);
// ici on va declaerer les routes pour chaque module 
//exemple departure 
app.use("/api/departures", DepartureRoutes);
app.use("/api/stops", StopRoutes);

app.get("/test", (req, res) => {
    return res.send({message: "testing routes "});
})
//lines : 
import lineRoutes from "./modules/lines/routes/line.routes.js";
app.use("/api/v1/lines", lineRoutes);


app.use(errorHandler);

export default app;
