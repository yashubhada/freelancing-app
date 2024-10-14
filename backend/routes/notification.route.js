import {
    newNotification
} from '../controllers/notification.controller.js';
import express from 'express';
const router = express.Router();

router.post('/',newNotification);

export default router