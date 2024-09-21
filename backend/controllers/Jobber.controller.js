import Jobber from "../models/Jobber.model.js";
import Employer from "../models/employer.model.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Controller to sign up jobber
export const jobberSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already in use
        const existingJobber = await Jobber.findOne({ email });
        if (existingJobber) {
            return res.status(400).json({
                success: false,
                msg: "Email is already in use",
            });
        }

        // Check if the email is already in use
        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(400).json({
                success: false,
                msg: "Email is already in use"
            })
        }

        // Create a new jobber if the email doesn't exist
        const jobber = new Jobber({
            name,
            email,
            password,
        });

        // Save the jobber to the database
        await jobber.save();

        // Send a success response
        return res.status(201).json({
            success: true,
            jobber
        });
    } catch (err) {
        // Send a failure response with error message
        res.status(500).json({
            success: false,
            msg: "Failed to sign up. Please try again later",
            error: err.message,
        });
    }
};

// Controller to fetch single jobber
export const findSingleJobber = async (req, res) => {
    const { id } = req.params;
    try {
        const jobber = await Jobber.findById(id);
        if (!jobber) {
            return res.status(404).json({
                success: false,
                msg: "Jobber not found"
            });
        }
        return res.status(200).json({
            success: true,
            jobber
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message
        });
    }
}

// Controller to update bio
export const updateBio = async (req, res) => {
    try {
        const { userId, bio } = req.body;
        const jobber = await Jobber.findByIdAndUpdate(
            userId,
            { 'profile.bio': bio },
            { new: true }
        );
        if (!jobber) return res.status(404).json({ success: false, msg: "Job seeker not found" });
        return res.status(200).json({ success: true, msg: "Bio updated successfully", jobber });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
};

// Controller to update skills
export const updateSkills = async (req, res) => {
    try {
        const { userId, skills } = req.body;
        const jobber = await Jobber.findByIdAndUpdate(
            userId,
            { 'profile.skills': skills },
            { new: true }
        );
        if (!jobber) return res.status(404).json({ success: false, msg: "Job seeker not found" });
        return res.status(200).json({ success: true, msg: "Skills updated successfully", jobber });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
};

// Controller to update experience
export const updateExperience = async (req, res) => {
    try {
        const { userId, experience } = req.body;
        const jobber = await Jobber.findByIdAndUpdate(
            userId,
            { 'profile.experience': experience },
            { new: true }
        );
        if (!jobber) return res.status(404).json({ success: false, msg: "Job seeker not found" });
        return res.status(200).json({ success: true, msg: "Experience updated successfully", jobber });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
};

// Controller to update education
export const updateEducation = async (req, res) => {
    try {
        const { userId, education } = req.body;
        const jobber = await Jobber.findByIdAndUpdate(
            userId,
            { 'profile.education': education },
            { new: true }
        );
        if (!jobber) return res.status(404).json({ success: false, msg: "Job seeker not found" });
        return res.status(200).json({ success: true, msg: "Education updated successfully", jobber });
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Server error", error: err.message });
    }
};

// Controller to update Profile
export const UpdateProfile = (req, res) => {
    try {
        const { userId, name, headline } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' });
        }
        cloudinary.uploader.upload(req.file.path,
            { folder: 'proflex/UserProfileImages' },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, msg: err.message });
                }
                await Jobber.findByIdAndUpdate(
                    userId,
                    {
                        name,
                        profileImage: result.secure_url,
                        'profile.headline': headline,
                    },
                    { new: true }
                );
                res.status(200).json({ success: true, msg: 'Profile updated successfully' });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading image to Cloudinary' });
    }
};

// Controller to update Profile
export const updateResume = (req, res) => {
    try {
        const { userId } = req.body;
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' });
        }
        cloudinary.uploader.upload(req.file.path,
            {
                resource_type: 'raw',
                folder: 'proflex/UserResume'
            },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, msg: err.message });
                }
                await Jobber.findByIdAndUpdate(
                    userId,
                    {
                        'profile.resumeUrl': result.secure_url,
                    },
                    { new: true }
                );
                res.status(200).json({ success: true, msg: 'Resume updated successfully', url: result.secure_url });
            }
        );
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error uploading resume to Cloudinary' });
    }
};