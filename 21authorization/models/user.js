
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    // User's name
    name: {
        type: String,
        required: true,
        trim: true
    },

    // User's email
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },

    // Hashed password
    password: {
        type: String,
        required: true
    },

    // User's role
    role: {
        type: String,
        enum: ["user", "admin", "manager"],
        default: "user"
    }

}, {
    timestamps: true
});

// Create User model
const User = mongoose.model("User", userSchema);

module.exports = User;
/* Important concepts:
- enum restricts roles to three allowed values.
- default: "user" automatically assigns a normal user role.
- unique: true creates a unique index for email.
- timestamps: true creates createdAt and updatedAt*/