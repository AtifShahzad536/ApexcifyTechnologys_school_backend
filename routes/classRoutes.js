const express = require('express');
const router = express.Router();
const { createClass, getClasses, deleteClass } = require('../controllers/classController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Add later when token is fixed

router.route('/')
    .post(createClass)
    .get(getClasses);

router.route('/:id')
    .delete(deleteClass);

module.exports = router;
