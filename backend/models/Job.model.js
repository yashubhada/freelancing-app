import mongoose from 'mongoose';

const JobSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    requirements: {
        type: [String], // Array of strings for requirements
        required: true
    },
    location: {
        type: String,
        required: true
    },
    employmentType: {
        type: String,
        enum: ['Full-Time', 'Part-Time', 'Contract', 'Freelance', 'Internship'],
        required: true
    },
    salaryRange: {
        min: {
            type: String,
            required: true
        },
        max: {
            type: String,
            required: true
        },
    },
    employerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employer', // Reference to Employer collection
        required: true
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Active', 'Closed'],
        default: 'Active'
    },
    applicants: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'jobber', // Reference to JobSeeker collection
                required: true
            },
            status: {
                type: String,
                enum: ['Under Review', 'Interview', 'Rejected', 'Hired'],
                default: 'Under Review'
            }
        }
    ]
});

const Job = mongoose.model('Job', JobSchema);
export default Job;