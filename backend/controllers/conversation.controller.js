import Conversation from "../models/conversation.model.js";

export const createNewConversation = async (req, res) => {
    const { participants, senderId, message, userName, userProfileImage } = req.body;
    try {
        const newConversation = new Conversation({
            participants,
            userInfo: [{
                userName,
                userProfileImage
            }],
            messages: [{
                senderId,
                message,
            }]
        });
        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Get all conversations for a participant
export const allConversations = async (req, res) => {
    try {
        const conversations = await Conversation.find({
            participants: req.params.id
        })

        res.status(200).json(conversations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// Add a message to an existing conversation
export const addNewMessage = async (req, res) => {
    const { senderId, message } = req.body;

    try {
        const conversation = await Conversation.findById(req.params.conversationId);

        if (!conversation) {
            return res.status(404).json({ msg: 'Conversation not found' });
        }

        conversation.messages.push({ senderId, message });
        await conversation.save();

        res.status(200).json(conversation);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// get all messages via convarsation Id
export const getAllMessages = async (req, res) => {
    const { conversationId } = req.params;
    try {
        const allChat = await Conversation.findById(conversationId);
        if (!allChat) return res.status(404).json({ msg: 'Conversation not found' });
        res.status(200).json(allChat.messages);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
}