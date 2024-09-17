import express from 'express';
import {
    jobberSignup,
    findSingleJobber
} from '../controllers/Jobber.controller.js';
import { verifyToken } from '../middlewares/user.middelware.js';

const router = express.Router();

router.post("/signup", jobberSignup);
router.post("/findSingleJobber/:id", findSingleJobber);
router.get("/userTokenVerify", verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user,  // User info extracted from the token
    });
})

export default router;