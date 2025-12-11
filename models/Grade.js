const mongoose = require('mongoose');

const gradeSchema = new mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    subject: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subject',
        required: true
    },
    examType: {
        type: String,
        enum: ['Quiz', 'Assignment', 'Mid-term', 'Final', 'Project'],
        required: true
    },
    marks: {
        type: Number,
        required: true,
        min: 0,
        max: 100
    },
    totalMarks: {
        type: Number,
        required: true,
        default: 100
    },
    grade: {
        type: String,
        enum: ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F'],
        required: true
    },
    remarks: {
        type: String,
        trim: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    teacher: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

// Calculate grade based on marks
gradeSchema.pre('save', function (next) {
    const percentage = (this.marks / this.totalMarks) * 100;

    if (percentage >= 90) this.grade = 'A+';
    else if (percentage >= 85) this.grade = 'A';
    else if (percentage >= 80) this.grade = 'A-';
    else if (percentage >= 75) this.grade = 'B+';
    else if (percentage >= 70) this.grade = 'B';
    else if (percentage >= 65) this.grade = 'B-';
    else if (percentage >= 60) this.grade = 'C+';
    else if (percentage >= 55) this.grade = 'C';
    else if (percentage >= 50) this.grade = 'C-';
    else if (percentage >= 40) this.grade = 'D';
    else this.grade = 'F';

    next();
});

const Grade = mongoose.model('Grade', gradeSchema);

module.exports = Grade;
