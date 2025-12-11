const User = require('../models/User');

// @desc    Get all pending users
// @route   GET /api/approvals/pending
// @access  Admin
const getPendingUsers = async (req, res) => {
    try {
        const pendingUsers = await User.find({ status: 'Pending' })
            .select('-password')
            .sort({ requestedAt: -1 });

        res.json(pendingUsers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Approve user and assign role/class
// @route   PUT /api/approvals/:id/approve
// @access  Admin
const approveUser = async (req, res) => {
    try {
        console.log('Approval request received:', req.params.id);
        console.log('Request body:', req.body);
        console.log('Admin user:', req.user?._id);

        const { role, studentClass, rollNumber, children } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('User found:', user.email, 'Status:', user.status);

        if (user.status !== 'Pending') {
            return res.status(400).json({ message: 'User is not in pending status' });
        }

        // Update user with approval
        user.status = 'Approved';
        user.role = role;
        user.approvedBy = req.user._id; // Admin who approved
        user.approvedAt = new Date();

        // Assign class if student
        if (role === 'Student' && studentClass) {
            user.studentClass = studentClass;
            user.rollNumber = rollNumber;
        }

        // Assign children if parent
        if (role === 'Parent' && children && children.length > 0) {
            user.children = children;

            // Update each child to link to this parent
            await User.updateMany(
                { _id: { $in: children } },
                { $set: { parent: user._id } }
            );
        }

        console.log('Saving user with role:', role);
        await user.save();
        console.log('User saved successfully');

        const populatedUser = await User.findById(user._id)
            .select('-password')
            .populate('studentClass', 'name section')
            .populate('children', 'name email rollNumber')
            .populate('approvedBy', 'name');

        res.json({
            message: 'User approved successfully',
            user: populatedUser
        });
    } catch (error) {
        console.error('Error in approveUser:', error);
        res.status(500).json({ message: error.message });
    }
};

// @desc    Reject user registration
// @route   PUT /api/approvals/:id/reject
// @access  Admin
const rejectUser = async (req, res) => {
    try {
        const { reason } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.status = 'Rejected';
        user.approvedBy = req.user._id;
        user.approvedAt = new Date();

        await user.save();

        res.json({
            message: 'User registration rejected',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                status: user.status
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update user details (role, class, etc.)
// @route   PUT /api/approvals/:id/update
// @access  Admin
const updateUserDetails = async (req, res) => {
    try {
        const { role, studentClass, rollNumber, children } = req.body;
        const user = await User.findById(req.params.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update fields
        if (role) user.role = role;
        if (studentClass) user.studentClass = studentClass;
        if (rollNumber) user.rollNumber = rollNumber;

        // Update children if parent
        if (role === 'Parent' && children) {
            user.children = children;

            // Update each child to link to this parent
            await User.updateMany(
                { _id: { $in: children } },
                { $set: { parent: user._id } }
            );
        }

        await user.save();

        const populatedUser = await User.findById(user._id)
            .select('-password')
            .populate('studentClass', 'name section')
            .populate('children', 'name email rollNumber');

        res.json({
            message: 'User details updated successfully',
            user: populatedUser
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get all users (for management)
// @route   GET /api/approvals/users
// @access  Admin
const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ status: 'Approved' })
            .select('-password')
            .populate('studentClass', 'name section')
            .sort({ createdAt: -1 });

        res.json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    getPendingUsers,
    approveUser,
    rejectUser,
    updateUserDetails,
    getAllUsers
};
