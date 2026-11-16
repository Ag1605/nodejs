
const express = require('express');

const app = express();

// Home route
app.get('/', (req, res) => {
    res.send("Home Page");
});

// About route
app.get('/about', (req, res) => {
    res.send("About Page");
});

// Contact route
app.get('/contact', (req, res) => {
    res.send("Contact Page");
});

// Start server
app.listen(8000, () => {
    console.log("Server running");
});
