import express from 'express';
import {
    employerSignUp,
    fetchSingleEmploye,
    updateEmpProfile
} from '../controllers/Employer.controller.js';
import { verifyToken } from '../middlewares/user.middelware.js';
import multer from 'multer';
const storage = multer.diskStorage({
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});
const upload = multer({ storage: storage });
const router = express.Router();

router.post("/signup", employerSignUp);
router.get('/userTokenVerify', verifyToken, (req, res) => {
    res.json({
        success: true,
        user: req.user,  // User info extracted from the token
    });
});
router.post("/fetchSingleEmploye/:id", fetchSingleEmploye);
router.put("/updateEmpProfile/profile", upload.single("profileImage"), updateEmpProfile);

export default router;