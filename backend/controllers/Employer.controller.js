import Employer from "../models/employer.model.js";
import Jobber from "../models/Jobber.model.js";
import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const employerSignUp = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        // Check if the email is already in use
        const existingEmployer = await Employer.findOne({ email });
        if (existingEmployer) {
            return res.status(400).json({
                success: false,
                msg: "Email is already in use"
            })
        }
        // Check if the email is already in use
        const existingJobber = await Jobber.findOne({ email });
        if (existingJobber) {
            return res.status(400).json({
                success: false,
                msg: "Email is already in use",
            });
        }

        const employer = new Employer({
            name,
            email,
            password
        });
        await employer.save();
        return res.status(201).json({
            success: true,
            employer
        })
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Failed to sign up. Please try again later",
            error: err.message,
        });
    }
}

export const fetchSingleEmploye = async (req, res) => {
    const { id } = req.params;
    try {
        const emp = await Employer.findById(id);
        if (!emp) {
            return res.status(404).json({
                success: false,
                msg: "Employer not found"
            });
        }
        return res.status(200).json({
            success: true,
            emp
        });
    } catch (err) {
        console.log(err.message);
    }
}

export const updateEmpProfile = async (req, res) => {
    const { userId, name } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' });
        }
        cloudinary.uploader.upload(req.file.path,
            { folder: 'proflex/EmployerProfileImages' },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, msg: err.message });
                }
                await Employer.findByIdAndUpdate(
                    userId,
                    {
                        name,
                        profileImage: result.secure_url,
                    },
                    { new: true }
                );
                res.status(200).json({ success: true, msg: 'Profile updated successfully' });
            }
        );
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}

export const updateEmpCompanyInfo = async (req, res) => {
    const { userId, companyName, companyLogoImg, bio, industry, website, location } = req.body;
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, msg: 'No file uploaded' });
        }
        cloudinary.uploader.upload(req.file.path,
            { folder: 'proflex/EmployerProfileImages' },
            async (err, result) => {
                if (err) {
                    return res.status(500).json({ success: false, msg: err.message });
                }
                await Employer.findByIdAndUpdate(
                    userId,
                    {
                        'profile.companyName': companyName,
                        'profile.companyLogoImg': result.secure_url,
                        'profile.bio': bio,
                        'profile.industry': industry,
                        'profile.website': website,
                        'profile.location': location,
                    },
                    { new: true }
                );
                res.status(200).json({ success: true, msg: 'Company information updated successfully' });
            }
        );
    } catch (err) {
        return res.status(500).json({ success: false, msg: "Internal server error" });
    }
}