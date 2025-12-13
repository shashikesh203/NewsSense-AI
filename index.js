import express from "express";

const app = express();
const PORT = 4000;

// middleware
app.use(express.json());

// root route
app.get("/health", (req, res) => {
  res.send("Express server is running 🚀");
});

// sample API
app.get("/api/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    uptime: process.uptime(),
  });
});

// start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
