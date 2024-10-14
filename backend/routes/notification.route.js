import {
    newNotification,
    fetchUserNotifications
} from '../controllers/notification.controller.js';
import express from 'express';
const router = express.Router();

router.post('/',newNotification);
router.post('/fetchUserNotifications/:userId',fetchUserNotifications);

export default router