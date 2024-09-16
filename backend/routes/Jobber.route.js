import express from 'express';
import {
    jobberSignup,
} from '../controllers/Jobber.controller.js';

const router = express.Router();

router.post("/signup", jobberSignup);

export default router;