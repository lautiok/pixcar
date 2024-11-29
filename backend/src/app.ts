import express from "express";
import cors from "cors";
import { config } from "./config/config";
import { connectDB } from "./utils/mongodb";
import user_routes from "./routes/users.routes";
import auth_routes from "./routes/auth.routes";
import client_routes from "./routes/clients.routes";
import cookieParser from "cookie-parser";
import { ckeckSession } from "./middleware/sessionMiddleware";
import swaggerUi from "swagger-ui-express";
import swaggerSpec from "./swagger/swagger";
import vehicle_routes from "./routes/vehicles.routes";
const app = express();
const port = config.port;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  cors({
    origin: `${config.urlFrontend}`,
    credentials: true,
  })
);
app.use("/documentation", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use("/api/users", ckeckSession, user_routes);
app.use("/api/auth", auth_routes);
app.use("/api/clients", ckeckSession, client_routes);
app.use("/api/vehicles", ckeckSession, vehicle_routes);

connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  console.log(`Docs are available at http://localhost:${port}/documentation`);
});
