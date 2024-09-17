import Jobber from "../models/Jobber.model.js";
import Employer from "../models/employer.model.js";

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