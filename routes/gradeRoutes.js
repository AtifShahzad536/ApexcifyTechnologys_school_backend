const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addGrade,
    getGradesByStudent,
    getGradesBySubject,
    updateGrade,
    deleteGrade,
    getStudentGradeStats
} = require('../controllers/gradeController');

router.post('/', protect, addGrade);
router.get('/student/:studentId', getGradesByStudent);
router.get('/student/:studentId/stats', getStudentGradeStats);
router.get('/subject/:subjectId', getGradesBySubject);
router.put('/:id', protect, updateGrade);
router.delete('/:id', protect, deleteGrade);

module.exports = router;
