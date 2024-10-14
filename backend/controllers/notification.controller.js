import Notification from "../models/notification.model.js";
import Job from "../models/Job.model.js";

export const newNotification = async (req, res) => {
    const { userId, message, jobId } = req.body;
    try {
        const job = await Job.findById(jobId);
        if (!job) return res.status(404).json({ msg: 'Job not found' });

        const notification = new Notification({
            userId,
            message,
            jobId,
            companyImage: job.postedBy?.companyLogo,
            companyName: job.postedBy?.companyName
        });
        await notification.save();
        res.status(200).json({ msg: 'Notification sent successfully' });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

export const fetchUserNotifications = async (req, res) => {
    try {
        const notification = await Notification.find({ userId: req.params.userId });
        if (!notification) return res.status(404).json({ msg: 'Notifications not found' });
        res.status(200).json({ notification });
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
}