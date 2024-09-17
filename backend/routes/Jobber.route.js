import express from 'express';
import {
    jobberSignup,
    findSingleJobber,
    updateBio,
    updateSkills,
    updateExperience,
    updateEducation
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

// update profile info
router.put('/updateProfile/bio', updateBio);
router.put('/updateProfile/skills', updateSkills);
router.put('/updateProfile/experience', updateExperience);
router.put('/updateProfile/education', updateEducation);

export default router;