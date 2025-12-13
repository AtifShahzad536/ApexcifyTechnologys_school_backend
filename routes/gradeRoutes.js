const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    addGrade,
    getAllGrades,
    getGradesByStudent,
    getGradesBySubject,
    updateGrade,
    deleteGrade,
    getStudentGradeStats
} = require('../controllers/gradeController');

router.post('/', protect, addGrade);
router.get('/', protect, getAllGrades);
router.get('/student/:studentId', getGradesByStudent);
router.get('/student/:studentId/stats', getStudentGradeStats);
router.get('/subject/:subjectId', getGradesBySubject);
router.put('/:id', protect, updateGrade);
router.delete('/:id', protect, deleteGrade);

module.exports = router;
