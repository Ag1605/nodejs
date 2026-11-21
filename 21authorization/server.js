
require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const authRoutes = require("./routes/authroutes");

const userRoutes = require("./routes/userroutes");

const app = express();


// ======================================
// MIDDLEWARE
// ======================================

// Read JSON request body
app.use(express.json());


// ======================================
// ROUTES
// ======================================

// Authentication routes
app.use("/api/auth", authRoutes);

// User and authorization routes
app.use("/api/users", userRoutes);


// Home route
app.get("/", (req, res) => {

    res.send("Authorization Server Running");

});


// ======================================
// MONGODB CONNECTION
// ======================================

mongoose.connect(process.env.MONGO_URI)

    .then(() => {

        console.log("MongoDB connected successfully");

    })

    .catch((error) => {

        console.log("MongoDB connection error:", error);

        process.exit(1);

    });


// ======================================
// START SERVER
// ======================================

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});
