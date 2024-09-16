import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import connectToMongoDB from './config.js';
import jobberRouter from './routes/Jobber.route.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

dotenv.config();
connectToMongoDB();

const port = process.env.SERVER_PORT || 7191;

app.use('/jobber', jobberRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});