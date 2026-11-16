
const express = require('express');

// Create Express application
const app = express();

// Home route
app.get('/', (req, res) => {

    res.send("Welcome to Express.js");

});

// Start server
app.listen(8000, () => {
    console.log("Express server running on port 8000");
});
