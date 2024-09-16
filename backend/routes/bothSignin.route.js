import { userSignin } from "../controllers/bothSignin.controller.js";
import express from 'express';

const router = express.Router();

router.post("/signin", userSignin);

export default router;