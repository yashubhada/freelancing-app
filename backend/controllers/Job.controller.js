import Job from '../models/Job.model.js';
import Employer from '../models/employer.model.js';

// Create new job post
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
        // Fetch employer details based on employerId
        const employer = await Employer.findById(employerId);
        if (!employer) {
            return res.status(404).json({ msg: 'Employer not found' });
        }

        // Create a new job with employer's details
        const job = new Job({
            title,
            description,
            requirements,
            location,
            employmentType,
            salaryRange: {
                min: minSalary,
                max: maxSalary,
            },
            postedBy: {
                employerId,
                companyLogo: employer.profile.companyLogoImg,
                companyName: employer.profile.companyName
            },
            status
        });

        // Save the job to the database
        await job.save();

        return res.status(200).json({ msg: 'Job post created successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
};

// Fetch all job post
export const fetchAllJobPost = async (req, res) => {
    try {
        const job = await Job.find();
        return res.status(200).json(job);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// Fetch only active job post
export const fetchActiveJobs = async (req, res) => {
    try {
        const job = await Job.find({ status: 'Active' });
        return res.status(200).json(job);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}


// fetch all job in particular employe
export const fetchEmpAllJob = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.find({
            'postedBy.employerId': id,
        });
        if (!job) return res.status(400).json("Jobs not found");
        return res.status(200).json(job);
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// Delete particular job
export const deleteJobPost = async (req, res) => {
    const { id } = req.params;
    try {
        const job = await Job.findByIdAndDelete(id);
        if (!job) return res.status(400).json({ msg: 'Jobs not found' });
        return res.status(200).json({ msg: 'Job deleted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// change job status
export const changeJobPostStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const job = await Job.findByIdAndUpdate(
            id,
            { status },
            { new: true }
        );
        if (!job) return res.status(400).json({ msg: 'Jobs not found' });
        return res.status(200).json({ msg: 'Status changed successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}

// Job application
export const applyToJob = async (req, res) => {
    const { id } = req.params;
    const { userId } = req.body;
    try {
        const job = await Job.findById(id);
        if (!job) {
            return res.status(404).json({ msg: 'Job not found' });
        }
        // Add the applicant to the job
        job.applicants.push({
            userId,
            status: 'Under Review'
        });
        await job.save();
        return res.status(200).json({ msg: 'Application submitted successfully' });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Internal server error' });
    }
}