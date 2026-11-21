require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const authRoutes = require("./routes/authroutes");

const app = express();

// Read JSON request body
app.use(express.json());

// Authentication routes
app.use("/api/auth", authRoutes);

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch((error) => {
        console.log("MongoDB connection error:", error);
    });

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});