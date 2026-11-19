const mongoose = require("mongoose");

// Define the structure of Student document
const studentSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    age: {
        type: Number,
        required: true
    },

    course: {
        type: String,
        required: true
    }

}, {
    timestamps: true
});

// Create Student model
const Student = mongoose.model("Student", studentSchema);

// Export model
module.exports = Student;