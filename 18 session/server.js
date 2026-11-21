
require("dotenv").config();

const express = require("express");
const session = require("express-session");

const app = express();

// Middleware to read JSON request bodies
app.use(express.json());

// Configure session middleware
app.use(session({
    name: "sid",
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,

    cookie: {
        httpOnly: true,
        secure: false, // Use true with HTTPS in production
        sameSite: "lax",
        maxAge: 1000 * 60 * 60
    }
}));

// Temporary demo user
const demoUser = {
    id: 101,
    name: "Akshat",
    email: "akshat@gmail.com",
    password: "123456"
};

// Home route
app.get("/", (req, res) => {
    res.send("Session Management Server Running");
});

// Login API
app.post("/login", (req, res, next) => {

    const { email, password } = req.body;

    // Check login credentials
    if (
        email !== demoUser.email ||
        password !== demoUser.password
    ) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }

    // Generate a new session ID
    req.session.regenerate((err) => {

        if (err) {
            return next(err);
        }

        // Store user information in session
        req.session.user = {
            id: demoUser.id,
            name: demoUser.name,
            email: demoUser.email
        };

        // Save session before responding
        req.session.save((err) => {

            if (err) {
                return next(err);
            }

            res.json({
                message: "Login successful"
            });

        });

    });

});

// Profile API
app.get("/profile", (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    res.json({
        message: "Profile accessed successfully",
        user: req.session.user
    });

});

// Update session API
app.put("/update-session", (req, res) => {

    if (!req.session.user) {
        return res.status(401).json({
            message: "Please login first"
        });
    }

    req.session.user.name = req.body.name;

    res.json({
        message: "Session updated successfully",
        user: req.session.user
    });

});

// Logout API
app.post("/logout", (req, res, next) => {

    req.session.destroy((err) => {

        if (err) {
            return next(err);
        }

        res.clearCookie("sid", {
            httpOnly: true,
            sameSite: "lax",
            path: "/"
        });

        res.json({
            message: "Logout successful"
        });

    });

});

// Error handling middleware
app.use((err, req, res, next) => {

    console.error(err);

    res.status(500).json({
        message: "Internal server error"
    });

});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
