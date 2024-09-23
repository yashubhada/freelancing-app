import express from 'express';
import {
    employerSignUp,
    fetchSingleEmploye
} from '../controllers/Employer.controller.js';
import { verifyToken } from '../middlewares/user.middelware.js';

const router = express.Router();

router.post("/signup", employerSignUp);
router.get('/userTokenVerify', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user,  // User info extracted from the token
    });
});
router.post("/fetchSingleEmploye/:id", fetchSingleEmploye);

export default router;