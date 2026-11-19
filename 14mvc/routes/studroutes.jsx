const express = require("express");

const router = express.Router();

const {
    createStudent,
    getStudents,
    getStudentById,
    updateStudent,
    deleteStudent
} = require("../controllers/studentController");


// GET all students and POST a new student
router.route("/")
    .get(getStudents)
    .post(createStudent);


// GET, PUT and DELETE a particular student
router.route("/:id")
    .get(getStudentById)
    .put(updateStudent)
    .delete(deleteStudent);

module.exports = router;