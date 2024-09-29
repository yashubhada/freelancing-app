import Job from "../models/Job.model.js";

// Create new Job post

export const jobCreate = async (req, res) => {
    const {
        title,
        description,
        requirements,
        location,
        employmentType,
        minSalary,
        maxSalary,
        employerId,
        status,
    } = req.body;

    try {
        const job = new Job({
            title,
            description,
            requirements,
            location,
            employmentType,
            'salaryRange.min': minSalary,
            'salaryRange.max': maxSalary,
            employerId,
            status,
        });
        await job.save();
        return res.status(200).json({ msg: 'Job post created successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}