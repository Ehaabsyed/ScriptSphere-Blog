import mongoose, { connect } from "mongoose";
import { configDotenv } from "dotenv";

configDotenv()
const ConnectDB = async () => {
  try {
    await mongoose.connect('mongodb+srv://syedehaab12:Syed@100>@syed-0047.ndh3l2g.mongodb.net/ScriptSphere?retryWrites=true&w=majority&appName=SYED-0047');
    console.log("✅ MongoDB successfully connected!");
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message);
  }
};

export default ConnectDB;
