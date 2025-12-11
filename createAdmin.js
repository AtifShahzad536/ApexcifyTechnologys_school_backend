const mongoose = require('mongoose');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');

        // Delete existing admin if exists
        await User.deleteOne({ email: 'admin@school.com' });
        console.log('Removed old admin account if existed');

        // Create admin user - let the pre-save hook hash the password
        const admin = await User.create({
            name: 'Admin User',
            email: 'admin@school.com',
            password: 'admin123',  // Will be hashed by pre-save hook
            role: 'Admin',
            status: 'Approved',
            approvedAt: new Date()
        });

        console.log('✅ Admin account created successfully!');
        console.log('==========================================');
        console.log('Email: admin@school.com');
        console.log('Password: admin123');
        console.log('Role: Admin');
        console.log('Status: Approved');
        console.log('==========================================');
        console.log('You can now login with these credentials!');

        process.exit(0);
    } catch (error) {
        console.error('Error creating admin:', error);
        process.exit(1);
    }
};

createAdmin();
