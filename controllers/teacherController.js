const User = require('../models/User');

// @desc    Get all teachers
// @route   GET /api/teachers
// @access  Admin
const getTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: 'Teacher' });
        res.json(teachers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a teacher
// @route   POST /api/teachers
// @access  Admin
const createTeacher = async (req, res) => {
    try {
        const { name, email, password, qualification, phone, address } = req.body;

        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const teacher = await User.create({
            name,
            email,
            password,
            role: 'Teacher',
            qualification,
            phone,
            address
        });

        res.status(201).json(teacher);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getTeachers, createTeacher };
