import mongoose, { model, Schema } from 'mongoose';

const conversationSchema = new Schema({
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'employer',
            required: true
        },
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'jobber',
            required: true
        }
    ],
    userInfo: [
        {
            userName: {
                type: String,
                required: true
            },
            userProfileImage: {
                type: String,
                required: true
            },
        }
    ],
    messages: [
        {
            senderId: {
                type: String,
                required: true
            },
            message: {
                type: String,
                required: true
            },
            timestamp: {
                type: Date,
                default: Date.now
            }
        }
    ]
});

const Conversation = mongoose.model('conversation', conversationSchema);
export default Conversation;