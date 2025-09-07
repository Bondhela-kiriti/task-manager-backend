// Load environment variables from .env or Replit Secrets
require("dotenv").config();

const express = require("express");   // Framework to build APIs
const mongoose = require("mongoose"); // MongoDB connection
const cors = require("cors");         // Allow frontend to connect
const morgan = require("morgan");     // Logger (shows requests)

 // Task endpoints
const taskRoutes = require("./routes/task");
const authRoutes = require("./routes/auth");

const app = express();

// Middleware
app.use(express.json());   // Parse JSON request body
app.use(morgan("dev"));    // Log requests to console
app.use(cors()); // Allow all origins (safe for demo)

// Health check route
app.get("/", (req, res) => res.send("Task Manager API is running 🚀"));

// Attach routes
app.use("/api/tasks", taskRoutes);
app.use("/api/auth", authRoutes);

// Connect MongoDB + Start server
const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("✅ MongoDB connected");
    app.listen(PORT, () => console.log(`✅ Server running on ${PORT}`));
  })
  .catch((err) => console.error("❌ Mongo error:", err));
