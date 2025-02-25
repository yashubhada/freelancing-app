import mongoose from "mongoose";
import bcrypt from 'bcryptjs';

const jobberSchema = new mongoose.Schema({
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
        default: "https://res.cloudinary.com/dfcfncp2q/image/upload/v1726488767/proflex/userProfileImage_fpkypd.png"
    },
    role: {
        type: String,
        default: 'JobSeeker'
    },
    profile: {
        headline: {
            type: String,
            default: null
        },
        bio: {
            type: String,
            default: null
        },
        skills: {
            type: [String],
            required: true
        },
        experience: [
            {
                jobTitle: {
                    type: String,
                    required: true
                },
                company: {
                    type: String,
                    required: true
                },
                startDate: {
                    type: String,
                    required: true
                },
                endDate: {
                    type: String,
                    default: null
                }, // null for ongoing jobs
                description: {
                    type: String,
                    required: true
                }
            }
        ],
        education: [
            {
                institution: {
                    type: String
                },
                degree: {
                    type: String,
                    required: true
                },
                year: {
                    type: String,
                    required: true
                }
            }
        ],
        resumeUrl: {
            type: String,
            default: null
        }
    }
});

// Password hash middleware
jobberSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

const Jobber = mongoose.model('jobber', jobberSchema);
export default Jobber;