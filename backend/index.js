import express from 'express';
import dotenv from 'dotenv';
import connectToMongoDB from './config.js';
import jobberRouter from './routes/Jobber.route.js';

const app = express();
app.use(express.json());

dotenv.config();
connectToMongoDB();

const port = process.env.SERVER_PORT;

app.use('/jobber', jobberRouter);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});