import mongoose, { connect } from "mongoose";
import { configDotenv } from "dotenv";
// atlas connection string
// mongodb+srv://syedehaab12:Syedehaab@syed-0047.ndh3l2g.mongodb.net/ScriptSphere?retryWrites=true&w=majority&appName=SYED-0047

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
