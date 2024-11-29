import mongoose from "mongoose";
import { config } from "../config/config";

export const connectDB = async () => {
  try {
    if (!config.mongoURI) {
      throw new Error("Please set the MONGO_URI environment variable");
    }
    const conenect = await mongoose.connect(config.mongoURI);
    console.log("Connected to MongoDB");
    return conenect;
  } catch (error) {
    console.log(error);
  }
};
