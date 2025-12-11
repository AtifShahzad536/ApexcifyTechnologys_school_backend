const express = require('express');
const router = express.Router();
const {
    submitAssignment,
    getSubmissions,
    gradeSubmission,
    getSubmissionStats,
    updateSubmission
} = require('../controllers/submissionController');

router.post('/', submitAssignment);
router.get('/', getSubmissions);
router.put('/:id', updateSubmission);
router.put('/:id/grade', gradeSubmission);
router.get('/assignment/:assignmentId/stats', getSubmissionStats);

module.exports = router;
