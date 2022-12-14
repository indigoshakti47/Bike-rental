import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";



import authRoutes from "./routes/auth.routes.js";
import usersRoutes from "./routes/users.routes.js";
import bikesRoutes from "./routes/bike.routes.js";
import reservationRoutes from "./routes/reservation.routes.js";
import ratingRoutes from "./routes/rating.routes.js";



  import { createRoles } from "./libs/initialSetup.js";
const app = express();
createRoles();

app.set("port", process.env.PORT || 4000);
app.set("json spaces", 4);

const corsOptions = {
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.json({
    message: "Welcome to my Bikes API",
    name: 'bike-rental_server',
    version: '1.0.0',
    description: '',
    author: '',
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", usersRoutes);
app.use("/api/bike", bikesRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/rating", ratingRoutes);

export default app;
