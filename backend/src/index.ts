import express from "express";
import cors from "cors";
import "dotenv/config";

const app = express();
const PORT = process.env["PORT"] || 3001;

// Middlewares
app.use(cors());
app.use(express.json());

// Health check route
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", message: "Rent-ish API is running 🚀" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server is running at http://localhost:${PORT}`);
});
