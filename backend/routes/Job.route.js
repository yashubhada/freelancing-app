import express from 'express';
const router = express.Router();
import { jobCreate, fetchAllJobPost, fetchActiveJobs } from '../controllers/Job.controller.js';

router.post('/newJobPost', jobCreate);
router.post('/fetchAllJobPost', fetchAllJobPost);
router.post('/fetchActiveJobPost', fetchActiveJobs);

export default router;