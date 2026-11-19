const Student = require("../models/Student");

// CREATE STUDENT
const createStudent = async (req, res) => {

    try {

        const { name, email, age, course } = req.body;

        const student = new Student({
            name,
            email,
            age,
            course
        });

        const savedStudent = await student.save();

        res.status(201).json({
            message: "Student created successfully",
            student: savedStudent
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// GET ALL STUDENTS
const getStudents = async (req, res) => {

    try {

        const students = await Student.find();

        res.status(200).json({
            students
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }
};


// GET SINGLE STUDENT
const getStudentById = async (req, res) => {

    try {

        const student = await Student.findById(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            student
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// UPDATE STUDENT
const updateStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student updated successfully",
            student
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// DELETE STUDENT
const deleteStudent = async (req, res) => {

    try {

        const student = await Student.findByIdAndDelete(req.params.id);

        if (!student) {
            return res.status(404).json({
                message: "Student not found"
            });
        }

        res.status(200).json({
            message: "Student deleted successfully"
        });

    } catch (error) {

        res.status(400).json({
            message: error.message
        });

    }
};


// EXPORT CONTROLLER FUNCTIONS
module.exports = {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
};