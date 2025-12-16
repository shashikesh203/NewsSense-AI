import dotenv from "dotenv";
dotenv.config();

import express from "express";
import ingestRoute from "./routes/ingestRoute";

const app = express();

app.use(express.json());

app.get("/health", (_req, res) => {
  res.send("Server running");
});

app.use("/api/news", ingestRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});
