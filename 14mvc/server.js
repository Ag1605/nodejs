const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const studentRoutes = require("./routes/studentRoutes");

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/students", studentRoutes);

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {

        console.log("MongoDB Connected Successfully");

        const PORT = process.env.PORT || 5000;

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    })
    .catch((error) => {
        console.log("Database connection failed:", error.message);
        process.exit(1);
    });