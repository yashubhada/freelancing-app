import express from 'express';
const router = express.Router();
import { jobCreate } from '../controllers/Job.controller.js';

router.post('/newJobPost', jobCreate);

export default router;