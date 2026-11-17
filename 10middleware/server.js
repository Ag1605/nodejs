const express = require('express');

const app = express();

// Middleware
app.use((req, res, next) => {

    console.log("Middleware executed");

    next();

});

// Route
app.get('/', (req, res) => {

    res.send("Welcome to Home Page");

});

// Start server
app.listen(8000, () => {
    console.log("Server running on port 8000");
});