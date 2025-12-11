const express = require('express');
const router = express.Router();
const {
    generateResult,
    getResultByStudent,
    getResultsByClass,
    getResultById,
    deleteResult
} = require('../controllers/resultController');

router.post('/generate', generateResult);
router.get('/student/:studentId', getResultByStudent);
router.get('/class/:classId', getResultsByClass);
router.get('/:id', getResultById);
router.delete('/:id', deleteResult);

module.exports = router;
