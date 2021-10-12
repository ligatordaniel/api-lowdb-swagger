import express from "express";
import cors from "cors";
import morgan from "morgan";

// Swagger
import swaggerUI from "swagger-ui-express";
import swaggerJsDoc from "swagger-jsdoc";
import { options } from "./swaggerOptions";

import tasksRoutes from "./routes/tasks.routes";
import usersRoutes from "./routes/users.routes";

const app = express();

app.set("port", process.env.PORT || 3000);

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());

const specs = swaggerJsDoc(options);

// Routes
app.use(usersRoutes);
app.use(tasksRoutes);
app.use("/api-explorer", swaggerUI.serve, swaggerUI.setup(specs));

export default app;
