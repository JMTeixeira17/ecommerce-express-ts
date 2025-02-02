import express, { json } from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import routerIndex from "./routes/index.routes";
import { setupSwagger } from "./config/swagger";
import { validateJsonFormat } from "./middlewares/validateJson";

const app = express();

app.use(helmet());
app.use(cors());
app.use(json());
app.use(validateJsonFormat);

dotenv.config();
setupSwagger(app);

app.use("/api", routerIndex);

app.get("/", (req, res) => {
  res.send("Hello World");
});

export default app;
