import Conversation from "../models/conversation.model.js";

export const createNewConversation = async (req, res) => {
    const {
        user1id,
        user1name,
        user1ProfileImage,
        user2id,
        user2name,
        user2ProfileImage,
        senderId,
        message
    } = req.body;
    try {
        const newConversation = new Conversation({
            participants: [
                {
                    userId: user1id,
                    userName: user1name,
                    userProfileImage: user1ProfileImage
                },
                {
                    userId: user2id,
                    userName: user2name,
                    userProfileImage: user2ProfileImage
                }
            ],
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
            participants: {
                $elemMatch: { userId: req.params.id }
            }
        });

        // Check if no conversations were found
        if (conversations.length === 0) {
            return res.status(404).json({ msg: 'Conversation not found' });
        }

        // If conversations are found, return them
        res.status(200).json(conversations);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
};

// check conversation exist or not

export const conversationExist = async (req, res) => {
    const { participant1Id, participant2Id } = req.body;
    try {
        const conversation = await Conversation.findOne({
            participants: {
                $all: [
                    { $elemMatch: { userId: participant1Id } },
                    { $elemMatch: { userId: participant2Id } }
                ]
            }
        });
        if (!conversation) return res.status(404).json({ msg: 'Conversation not found' });
        res.status(200).json(conversation);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ msg: 'Internal server error' });
    }
}

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