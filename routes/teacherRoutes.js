const express = require('express');
const router = express.Router();
const { getTeachers, createTeacher } = require('../controllers/teacherController');

router.route('/')
    .get(getTeachers)
    .post(createTeacher);

module.exports = router;
