import mongoose from "mongoose";
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Database is running as expected ✅");
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    process.exit(1); // exit process if DB connection fails
  }
};
export default connectDB;
