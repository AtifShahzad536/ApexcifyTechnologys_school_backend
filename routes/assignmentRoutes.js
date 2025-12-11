const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const {
    createAssignment,
    getAssignments,
    getAssignmentById,
    updateAssignment,
    deleteAssignment
} = require('../controllers/assignmentController');

router.route('/')
    .post(protect, createAssignment)
    .get(getAssignments);

router.route('/:id')
    .get(getAssignmentById)
    .put(protect, updateAssignment)
    .delete(protect, deleteAssignment);

module.exports = router;
