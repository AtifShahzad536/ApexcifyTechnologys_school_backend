const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    updateTimetable,
    getTimetable,
    createEvent,
    getEvents,
    deleteEvent
} = require('../controllers/calendarController');

// Timetable Routes
router.route('/timetable')
    .post(protect, updateTimetable);

router.route('/timetable/:classId')
    .get(protect, getTimetable);

// Event Routes
router.route('/events')
    .get(protect, getEvents)
    .post(protect, createEvent);

router.route('/events/:id')
    .delete(protect, deleteEvent);

module.exports = router;
