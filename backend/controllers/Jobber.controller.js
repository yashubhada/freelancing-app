import Jobber from "../models/Jobber.model.js";

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
