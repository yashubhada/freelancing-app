import mongoose from "mongoose";

const jobberSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImage: { type: String, default: null },
    profile: {
        headline: { type: String, default: null },
        bio: { type: String, default: null },
        skills: { type: [String], required: true },
        experience: [
            {
                jobTitle: { type: String, required: true },
                company: { type: String, required: true },
                startDate: { type: Date, required: true },
                endDate: { type: Date, default: null }, // null for ongoing jobs
                description: { type: String, required: true }
            }
        ],
        education: [
            {
                institution: { type: String },
                degree: { type: String, required: true },
                year: { type: String, required: true }
            }
        ],
        resumeUrl: { type: String, default: null }
    }
});

const Jobber = mongoose.model('jobber', jobberSchema);
export default Jobber;