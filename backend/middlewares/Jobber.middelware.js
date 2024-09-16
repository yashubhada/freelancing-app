import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const verifyToken = (req, res, next) => {
    const token = req.cookies.token; // Get token from the cookie

    if (!token) {
        return res.status(401).json({
            success: false,
            msg: "Unauthorized access, no token found",
        });
    }

    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
        req.jobber = decoded; // Attach the decoded data to the request object
        next(); // Continue to the protected route
    } catch (err) {
        return res.status(403).json({
            success: false,
            msg: "Invalid token",
        });
    }
};