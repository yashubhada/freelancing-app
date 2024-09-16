import Employer from "../models/employer.model.js";
import Jobber from "../models/Jobber.model.js";

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