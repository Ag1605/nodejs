
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const Student = require("./models/Student");

dotenv.config();

const app = express();

// Middleware to read JSON data
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB Connected Successfully");
    })
    .catch((error) => {
        console.log("MongoDB Connection Error:", error.message);
    });


// =====================================
// 1. CREATE STUDENT - POST
// =====================================

app.post("/api/students", async (req, res) => {

    try {

        // Get data from request body
        const { name, email, age, course } = req.body;

        // Create new student
        const newStudent = new Student({
            name,
            email,
            age,
            course
        });

        // Save student in MongoDB
        const savedStudent = await newStudent.save();

        res.status(201).json({
            message: "Student created successfully",
            student: savedStudent
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// =====================================
// 2. GET ALL STUDENTS - GET
// =====================================

app.get("/api/students", async (req, res) => {

    try {

        // Fetch all students from MongoDB
        const students = await Student.find();

        res.status(200).json({
            message: "Students fetched successfully",
            students: students
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

});


// =====================================
// 3. GET SINGLE STUDENT - GET
// =====================================

app.get("/api/students/:id", async (req, res) => {

    try {

        // Get student ID from URL
        const id = req.params.id;

        // Find student by ID
        const student = await Student.findById(id);

        // Check if student exists
        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            student: student
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// =====================================
// 4. UPDATE STUDENT - PUT
// =====================================

app.put("/api/students/:id", async (req, res) => {

    try {

        const id = req.params.id;

        // Find and update student
        const updatedStudent = await Student.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!updatedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student: updatedStudent
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// =====================================
// 5. DELETE STUDENT - DELETE
// =====================================

app.delete("/api/students/:id", async (req, res) => {

    try {

        const id = req.params.id;

        // Find and delete student
        const deletedStudent = await Student.findByIdAndDelete(id);

        if (!deletedStudent) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }

});


// Start server after MongoDB connects
mongoose.connection.once("open", () => {

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });

});
