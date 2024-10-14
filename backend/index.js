import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import connectToMongoDB from './config.js';
import jobberRouter from './routes/Jobber.route.js';
import employerRouter from './routes/Employer.route.js';
import bothSigninRouter from './routes/bothSignin.route.js';
import jobRouter from './routes/Job.route.js';
import conversationRouter from './routes/Conversation.route.js';
import notificationRouter from './routes/notification.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: 'http://localhost:5173',  // frontend URL
    credentials: true,  // Allow cookies and credentials to be sent
}));

dotenv.config();
connectToMongoDB();

const port = process.env.SERVER_PORT || 7191;

app.use('/jobber', jobberRouter);
app.use('/employer', employerRouter);
app.use('/userSignin', bothSigninRouter);
app.use('/jobPost', jobRouter);
app.use('/conversation', conversationRouter);
app.use('/notification', notificationRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});