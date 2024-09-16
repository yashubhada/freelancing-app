import express from 'express';
import {
    employerSignUp
} from '../controllers/Employer.controller.js';
const router = express.Router();

router.post("/signup", employerSignUp)

export default router;