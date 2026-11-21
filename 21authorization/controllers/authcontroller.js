
const User = require("../models/user");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");


// ======================================
// REGISTER USER
// ======================================

async function registerUser(req, res) {

    try {

        const { name, email, password } = req.body;

        // Check required fields
        if (!name || !email || !password) {
            return res.status(400).json({
                message: "All fields are required"
            });
        }

        // Check password length
        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must be at least 8 characters"
            });
        }

        // Normalize email
        const normalizedEmail = email.trim().toLowerCase();

        // Check existing user
        const existingUser = await User.findOne({
            email: normalizedEmail
        });

        if (existingUser) {
            return res.status(409).json({
                message: "User already exists"
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        // Role is not accepted from the client.
        // MongoDB will assign the default role: user.

        const newUser = await User.create({

            name: name,

            email: normalizedEmail,

            password: hashedPassword

        });

        // Send response
        res.status(201).json({

            message: "Registration successful",

            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                role: newUser.role
            }

        });

    } catch (error) {

        console.error(error);

        // Handle duplicate email race condition
        if (error.code === 11000) {
            return res.status(409).json({
                message: "Email already registered"
            });
        }

        res.status(500).json({
            message: "Server error"
        });

    }

}


// ======================================
// LOGIN USER
// ======================================

async function loginUser(req, res) {

    try {

        const { email, password } = req.body;

        // Check required fields
        if (!email || !password) {
            return res.status(400).json({
                message: "Email and password are required"
            });
        }

        // Find user by email
        const user = await User.findOne({
            email: email.trim().toLowerCase()
        });

        // Check whether user exists
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Compare entered password with hashed password
        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            return res.status(401).json({
                message: "Invalid email or password"
            });
        }

        // Generate JWT token
        const token = jwt.sign(

            {
                id: user._id.toString(),
                role: user.role
            },

            process.env.JWT_SECRET,

            {
                expiresIn: "15m"
            }

        );

        // Send token and user details
        res.status(200).json({

            message: "Login successful",

            token: token,

            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role
            }

        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Server error"
        });

    }

}


// Export functions
module.exports = {
    registerUser,
    loginUser
};
