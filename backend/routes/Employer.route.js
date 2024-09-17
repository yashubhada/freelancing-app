import express from 'express';
import {
    employerSignUp
} from '../controllers/Employer.controller.js';
import { verifyToken } from '../middlewares/user.middelware.js';

const router = express.Router();

router.post("/signup", employerSignUp);
router.get('/employe-dashboard', verifyToken, (req, res) => {
    res.json({
        success: true,
        msg: 'Welcome to the employee dashboard',
        user: req.user,  // User info extracted from the token
    });
});

export default router;