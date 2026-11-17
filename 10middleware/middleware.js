
const express = require('express');

const app = express();

// 1. Built-in middleware
app.use(express.json());

// 2. Application-level middleware
app.use((req, res, next) => {

    console.log("Request URL:", req.url);
    console.log("Request Method:", req.method);

    next();

});

// 3. Authentication middleware
const checkAuth = (req, res, next) => {

    const token = req.headers.authorization;

    if (token === "Bearer my-secret-token") {

        console.log("Authentication successful");

        next();

    } else {

        return res.status(401).json({
            message: "Unauthorized access"
        });

    }

};

// Public route
app.get('/', (req, res) => {

    res.send("Welcome to Home Page");

});

// Protected route
app.get('/dashboard', checkAuth, (req, res) => {

    res.send("Welcome to Dashboard");

});

// POST route
app.post('/users', (req, res) => {

    const user = req.body;

    res.status(201).json({
        message: "User created successfully",
        user: user
    });

});

// Start server
app.listen(8000, () => {

    console.log("Server running on port 8000");

});
