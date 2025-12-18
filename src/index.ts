import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import router from "./routes";
import config from "./config";
import { rateLimiter } from "./middleware/rateLimiter";

const app = express();

app.use(express.json());

app.use(loggerMiddleware)

app.use(rateLimiter);

app.get("/health", (_req, res) => {
  res.send("Server running");
});

app.use("/api", router);

app.use(errorHandler)

app.listen(config.commonConfig.port, () => {
  console.log(`Server running on http://localhost:${config.commonConfig.port}`);
});
