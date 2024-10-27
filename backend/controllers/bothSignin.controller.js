import Jobber from "../models/Jobber.model.js";
import Employer from "../models/employer.model.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

export const userSignin = async (req, res) => {
    const { email, password } = req.body;

    try {
        // Try to find the user as either a jobber or employer
        const jobber = await Jobber.findOne({ email });
        const employer = await Employer.findOne({ email });

        if (!jobber && !employer) {
            return res.status(400).json({
                success: false,
                msg: "Invalid credentials",
            });
        }

        let user, isValidPassword, tokenData;

        // If jobber exists, validate jobber credentials
        if (jobber) {
            isValidPassword = await bcrypt.compare(password, jobber.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid credentials",
                });
            }
            user = jobber;
            tokenData = {
                userId: jobber._id,
                name: jobber.name,
                profileImage: jobber.profileImage,
                email: jobber.email,
                role: jobber.role,
            };
        }

        // If employer exists and jobber was not found, validate employer credentials
        if (employer && !jobber) {
            isValidPassword = await bcrypt.compare(password, employer.password);
            if (!isValidPassword) {
                return res.status(400).json({
                    success: false,
                    msg: "Invalid credentials",
                });
            }
            user = employer;
            tokenData = {
                userId: employer._id,
                profileImage: employer.profileImage,
                name: employer.name,
                email: employer.email,
                role: employer.role,
            };
        }

        // Generate JWT token for the authenticated user
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1h' });

        // Store token in a cookie
        res.cookie('token', token, {
            // Local server coockie sent/recive
            // httpOnly: true,      // True when cookie store sensitive data
            // secure: process.env.NODE_ENV === 'production',
            // sameSite: 'Strict',
            // maxAge: 3600000, // 1 hour

            // live server coockie sent/recive
            domain: 'proflex-13tx.onrender.com',
            path: '/',
            secure: true,
            sameSite: 'None',
            httpOnly: true,
            maxAge: 3600000,   // 1 hour
        });

        return res.status(201).json({
            success: true,
            msg: "Signed in successfully",
            role: tokenData.role,
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            msg: "Internal server error",
            error: err.message,
        });
    }
};
