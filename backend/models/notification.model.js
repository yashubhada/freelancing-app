import mongoose, { Schema } from "mongoose";

const notification = new Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'jobber',
        required: true
    },
    message: {
        type: String,
        required: true
    },
    jobId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    companyImage: {
        type: String,
        required: true
    },
    companyName: {
        type: String,
        require: true
    }
});

const Notification = mongoose.model('notification', notification);
export default Notification;