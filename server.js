const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const connectDB = require('./config/db');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({
    origin: ['http://localhost:5173', 'http://localhost:5174'], // Allow both ports
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./routes/authRoutes');

// Database Connection
connectDB();



app.use('/api/auth', authRoutes);
app.use('/api/approvals', require('./routes/approvalRoutes'));
app.use('/api/parents', require('./routes/parentRoutes'));
app.use('/api/classes', require('./routes/classRoutes'));
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/subjects', require('./routes/subjectRoutes'));
app.use('/api/grades', require('./routes/gradeRoutes'));
app.use('/api/attendance', require('./routes/attendanceRoutes'));
app.use('/api/results', require('./routes/resultRoutes'));
app.use('/api/assignments', require('./routes/assignmentRoutes'));
app.use('/api/submissions', require('./routes/submissionRoutes'));
app.use('/api/reports', require('./routes/reportRoutes'));
app.use('/api/materials', require('./routes/materialRoutes'));
app.use('/api/calendar', require('./routes/calendarRoutes'));
app.use('/api/leaves', require('./routes/leaveRoutes'));
app.use('/api/exams', require('./routes/examRoutes'));
app.use('/api/fees', require('./routes/feeRoutes'));

// Routes Placeholder
app.get('/', (req, res) => {
    res.send('API is running...');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
    const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    res.status(statusCode);
    res.json({
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack,
    });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
