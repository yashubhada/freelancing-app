import Conversation from "../models/conversation.model.js";

export const createNewConversation = async (req, res) => {
    const { participants, message, senderId } = req.body;
    try {
        const newConversation = new Conversation({
            participants,
            messages: [{
                senderId,
                message
            }]
        });
        await newConversation.save();
        res.status(201).json(newConversation);
    } catch (err) {
        console.error(err.message);
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
        console.error(err.message);
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
        console.error(err.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};