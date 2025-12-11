const express = require('express');
const router = express.Router();
const { getStudents, createStudent, getStudentById } = require('../controllers/studentController');

router.route('/')
    .get(getStudents)
    .post(createStudent);

router.route('/:id')
    .get(getStudentById);

module.exports = router;
