const express = require('express');
const router = express.Router();
const { getStudents, createStudent, getStudentById, deleteStudent } = require('../controllers/studentController');

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id')
    .get(getStudentById)
    .delete(deleteStudent);

module.exports = router;
