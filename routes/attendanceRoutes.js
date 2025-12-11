const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    markAttendance,
    markBulkAttendance,
    getAttendanceByStudent,
    getAttendanceByClass,
    getAttendanceStats,
    updateAttendance,
    getAllStudentsAttendance,
    getStudentPerformanceReport
} = require('../controllers/attendanceController');

router.post('/', protect, markAttendance);
router.post('/bulk', protect, markBulkAttendance);
router.get('/reports/all-students', protect, getAllStudentsAttendance);
router.get('/reports/performance/:studentId', protect, getStudentPerformanceReport);
router.get('/student/:studentId', getAttendanceByStudent);
router.get('/student/:studentId/stats', getAttendanceStats);
router.get('/class/:classId', getAttendanceByClass);
router.put('/:id', protect, updateAttendance);

module.exports = router;
