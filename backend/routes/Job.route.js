import express from 'express';
const router = express.Router();
import {
    jobCreate,
    fetchAllJobPost,
    fetchActiveJobs,
    fetchEmpAllJob,
    deleteJobPost,
    changeJobPostStatus,
    applyToJob,
    fetchOneJob
} from '../controllers/Job.controller.js';

router.post('/newJobPost', jobCreate);
router.post('/fetchAllJobPost', fetchAllJobPost);
router.post('/fetchActiveJobPost', fetchActiveJobs);
router.post('/fetchEmpJob/:id', fetchEmpAllJob);
router.post('/deleteJobPost/:id', deleteJobPost);
router.put('/changeJobPostStatus/:id', changeJobPostStatus);
router.post('/applyToJob/:id', applyToJob);
router.post('/fetchOneJob/:jobId', fetchOneJob);

export default router;