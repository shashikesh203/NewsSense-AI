import express, { Request, Response } from "express";

const app = express();
const PORT: number = process.env.PORT ? Number(process.env.PORT) : 4000;

// middleware
app.use(express.json());

// root route
app.get("/health", (_req: Request, res: Response) => {
  res.send("Express server is running 🚀");
});

// sample API
app.get("/api/health", (_req: Request, res: Response) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});

