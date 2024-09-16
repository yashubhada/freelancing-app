import Jobber from "../models/Jobber.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';
dotenv.config();

export const jobberSignup = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Check if the email is already in use
        const existingJobber = await Jobber.findOne({ email });

        if (existingJobber) {
            return res.status(400).json({
                success: false,
                msg: "Email is already in use. Please use a different email.",
            });
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
        res.status(201).json({
            success: true,
            jobber
        });
    } catch (err) {
        // Send a failure response with error message
        res.status(500).json({
            success: false,
            msg: "Failed to sign up. Please try again later.",
            error: err.message,
        });
    }
};

export const jobberSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find the jobber by email
        const jobber = await Jobber.findOne({ email });
        if (!jobber) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        // Check if the password matches
        const isPasswordValid = await bcrypt.compare(password, jobber.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        // Create JWT token for authenticating the jobber
        const token = jwt.sign({
            jobberId: jobber._id,
            name: jobber.name,
            email: jobber.email
        }, process.env.JWT_SECRET_KEY, { expiresIn: '1h' }); // Add an expiration time if necessary

        // Store token in a cookie
        res.cookie('token', token, {
            httpOnly: true, // Make the cookie accessible only by the web server
            secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
            sameSite: 'Strict', // Controls cookie's behavior in cross-site requests
            maxAge: 3600000, // 1 hour
        })

        res.status(201).json({ success: true, msg: "Signed in successfully" });
    } catch (err) {
        res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message,
        });
    }
}