import mongoose, { Mongoose } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async (): Promise<Mongoose | void> => {
    try {
        const mongoUrl = process.env.MONGODB_URL;

        if (!mongoUrl) {
            throw new Error("MongoDB connection URL is not defined in environment variables.");
        }

        const conn = await mongoose.connect(mongoUrl);
        console.log("Connected to MongoDB Successfully!");
        return conn;
    } catch (err) {
        if (err instanceof Error) {
            console.log(`Error: ${err.message}`);
        } else {
            console.log(`An unknown error occurred: ${err}`);
        }
        process.exit(1);
    }
};

export default connectDB;
