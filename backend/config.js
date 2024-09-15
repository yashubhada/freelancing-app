import mongoose from "mongoose";
import dotenv from 'dotenv';

dotenv.config();
const uri = process.env.CONNECTION_URL;

const connectToMongoDB = async () => {
    try {
        await mongoose.connect(uri);
        console.log("Connection successfully");
    } catch (error) {
        console.log("Connection faild", error);
    }
}

export default connectToMongoDB;