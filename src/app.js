import express from 'express';
import authRoutes from './modules/auth/routes/auth.routes.js';
import errorHandler from './shared/middlewares/error.middleware.js';
import coachRoutes from "./modules/coachs/routes/coach.routes.js";

const app = express();


app.use(express.json());

app.use("/api/auth", authRoutes);
// ici on va declaerer les routes pour chaque module 
//exemple departure 
// app.use("/api/departure", DepartureRoutes);


app.get("/test", (req, res) => {
    return res.send({message: "testing routes "});
})

app.use("/api/coaches", coachRoutes);
app.use(errorHandler);

export default app;
