import express from 'express';
const router = express.Router();
import {
    createNewConversation,
    allConversations,
    addNewMessage,
    getAllMessages
} from '../controllers/conversation.controller.js';

router.post('/newConversation', createNewConversation);
router.post('/allConversations/:id', allConversations);
router.post('/addNewMessage/:conversationId', addNewMessage);
router.post('/getAllMessages/:conversationId', getAllMessages);

export default router;