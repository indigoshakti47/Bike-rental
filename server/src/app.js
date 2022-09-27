import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";

import pkg from "../package.json";

import authRoutes from "./routes/auth.routes";
import restaurantsRoutes from "./routes/restaurants.routes";
import mealsRoutes from "./routes/meals.routes";
import ordersRoutes from "./routes/orders.routes";
import usersRoutes from "./routes/users.routes";

import { createRoles } from "./libs/initialSetup";

const app = express();
createRoles();

app.set("pkg", pkg);
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
    name: app.get("pkg").name,
    version: app.get("pkg").version,
    description: app.get("pkg").description,
    author: app.get("pkg").author,
  });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/shop", shopsRoutes);
app.use("/api/bike", bikesRoutes);
app.use("/api/reservations", reservationsRoutes);
app.use("/api/user", usersRoutes);

export default app;
