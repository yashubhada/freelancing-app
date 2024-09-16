import express from 'express';
import {
    jobberSignup,
    jobberSignin,
} from '../controllers/Jobber.controller.js';

const router = express.Router();

router.post("/signup", jobberSignup);
router.post("/signin", jobberSignin);

export default router;