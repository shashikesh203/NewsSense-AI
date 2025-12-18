import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { errorHandler } from "./middleware/errorHandler";
import { loggerMiddleware } from "./middleware/loggerMiddleware";
import router from "./routes";

const app = express();

app.use(express.json());

app.use(loggerMiddleware)

app.get("/health", (_req, res) => {
  res.send("Server running");
});

app.use("/api", router);

app.use(errorHandler)

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
