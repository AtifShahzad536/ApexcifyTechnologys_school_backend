const express = require('express');
const router = express.Router();
const { createClass, getClasses } = require('../controllers/classController');
// const { protect, admin } = require('../middleware/authMiddleware'); // Add later when token is fixed

router.route('/')
    .post(createClass)
    .get(getClasses);

module.exports = router;
