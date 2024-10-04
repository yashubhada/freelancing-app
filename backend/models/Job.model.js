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
    postedBy: {
        employerId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employer', // Reference to Employer collection
            required: true
        },
        companyLogo: {
            type: String,
            required: true
        },
        companyName: {
            type: String,
            required: true
        },
    },
    datePosted: {
        type: Date,
        default: Date.now
    },
    status: {
        type: String,
        enum: ['Active', 'Deactivate'],
        default: 'Active'
    },
    applicants: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'jobber', // Reference to JobSeeker collection
                required: true
            },
            resumeUrl: {
                type: String,
                required: true
            },
            coverLetter: {
                type: String,
                required: true
            },
            status: {
                type: String,
                enum: ['Under Review', 'Interview', 'Rejected', 'Hired'],
                default: 'Under Review'
            },
            appliedOn: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Job = mongoose.model('Job', JobSchema);
export default Job;