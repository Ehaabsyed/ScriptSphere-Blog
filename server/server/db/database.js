import mongoose, { connect } from "mongoose";
import { configDotenv } from "dotenv";
// atlas connection string

configDotenv()
const ConnectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB successfully connected!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default ConnectDB;
