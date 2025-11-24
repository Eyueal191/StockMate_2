import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import rootRoute from "./routes/barrel.js";
import globalErrorHandler from "./middlewares/GlobalErrorHandler.js";

// Load environment variables
dotenv.config();

const app = express();
app.use(cookieParser())
// Middleware
app.use(express.json());       // Parse JSON requests
app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin) return callback(null, true); // allow requests without origin (e.g. Postman)
      console.log("🌍 CORS request from:", origin); // optional, for debugging
      return callback(null, true); // dynamically allow all origins
    },
    credentials: true, // ✅ enables cookies, tokens, etc.
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);             // Enable CORS for all origins
app.use(morgan("dev"));        // Log incoming requests

// Routes
app.use("/api", rootRoute);

// Global Error Handler (must be after routes)
app.use(globalErrorHandler);

// Start server after DB connection
const PORT = process.env.PORT || 8000;

connectDB()
  .then(() => {
    console.log("Database connected successfully ✅");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Database connection failed:", err.message);
    process.exit(1);
  });
