import express from 'express';
const router = express.Router();
import { jobCreate, fetchAllJobPost, fetchActiveJobs, fetchEmpAllJob, deleteJobPost, changeJobPostStatus } from '../controllers/Job.controller.js';

router.post('/newJobPost', jobCreate);
router.post('/fetchAllJobPost', fetchAllJobPost);
router.post('/fetchActiveJobPost', fetchActiveJobs);
router.post('/fetchEmpJob/:id', fetchEmpAllJob);
router.post('/deleteJobPost/:id', deleteJobPost);
router.put('/changeJobPostStatus/:id', changeJobPostStatus);

export default router;