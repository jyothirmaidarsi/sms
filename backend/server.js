const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const studentRoutes = require("./routes/studentRoutes");
const authRoutes = require("./routes/authRoutes");
const protect = require("./middleware/protect");
const cors = require("cors");

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Auth Routes (public)
app.use("/api/auth", authRoutes);

// Connect Database
connectDB();

// Student Routes (protected)
app.use("/api/students", protect, studentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});