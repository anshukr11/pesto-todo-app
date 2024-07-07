import * as dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config()

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI as string);
    console.log('MongoDB connected');
  } catch (err) {
    console.error(err);
    process.exit(1); // Exit process with failure
  }
};

export default connectDB;