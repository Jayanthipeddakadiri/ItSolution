import mongoose from "mongoose";
import dotenv from "dotenv";
export const connectDB = async () => {
  dotenv.config();
  try {
    if (process.env.MONGO_URI) {
      await mongoose.connect(process.env.MONGO_URI);
      console.log("Connected to MongoDB");
    } else {
      console.error("MONGO_URI is not defined in .env file");
    }
  } catch (err) {}
};
