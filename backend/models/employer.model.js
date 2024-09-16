import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const employerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImage: {
        type: String,
        default: 'https://res.cloudinary.com/dfcfncp2q/image/upload/v1726488767/proflex/userProfileImage_fpkypd.png'
    },
    role: {
        type: String,
        default: 'Employer'
    },
    profile: {
        companyName: {
            type: String,
            default: null
        },
        bio: {
            type: String,
            default: null
        },
        industry: {
            type: String,
            default: null
        },
        website: {
            type: String,
            default: null
        },
        location: {
            type: String,
            default: null
        },
        jobsPosted: [
            {
                jobId: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'Job',
                    required: true
                },
                title: {
                    type: String,
                    required: true
                },
                status: {
                    type: String,
                    enum: ['Active', 'Inactive', 'Closed'],
                    default: 'Active'
                }
            }
        ]
    }
});

// Password hash middleware
employerSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Employer = mongoose.model('employer', employerSchema);
export default Employer;