const express = require('express');

const app = express();

// Middleware
app.use((req, res, next) => {

    // Adding custom property to request
    req.username = "Akshat";

    next();

});

// Route
app.get('/', (req, res) => {

    res.send("Welcome " + req.username);

});

app.listen(8000, () => {
    console.log("Server running on port 8000");
});