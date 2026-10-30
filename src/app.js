import express from 'express';
import DepartureRoutes from './modules/departures/routes/departure.routes.js';
import authRoutes from './modules/auth/routes/auth.routes.js';
import errorHandler from './shared/middlewares/error.middleware.js';
import coachRoutes from "./modules/coachs/routes/coach.routes.js";
import {scopePerRequest} from 'awilix-express';
import container from './bootsrap/container.js';
import StopRoutes from './modules/stops/routes/stop.routes.js';
import lineRoutes from './modules/lines/routes/line.routes.js';
import {authenticate} from './shared/middlewares/auth.middleware.js';

const app = express();
app.use(scopePerRequest(container));

app.use(express.json());
//auth
app.use("/api/auth", authRoutes);
// ici on va declaerer les routes pour chaque module 
//exemple departure 
app.use("/api/departures", authenticate,  DepartureRoutes);
app.use("/api/stops", StopRoutes);
app.use("/api/v1/lines", lineRoutes);


app.get("/test", (req, res) => {
    return res.send({message: "testing routes "});
})

app.use("/api/coaches", coachRoutes);
app.use(errorHandler);

export default app;
