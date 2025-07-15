import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import { userRouter } from './routes/user.js';
import ConnectDB from './db/database.js';
import cookieParser from 'cookie-parser';
import { blogRouter } from './routes/blog.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Load environment variables
configDotenv();

// Setup __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to MongoDB
ConnectDB();

const app = express();

// ✅ CORS must come FIRST — before any routes or middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://script-sphere-bice.vercel.app", // your Vercel frontend
  ],
  credentials: true, // allow cookies
}));

// ✅ Middleware to parse cookies and JSON
app.use(cookieParser());
app.use(express.json());

// ✅ Serve static files like images from /public
app.use(express.static(path.join(__dirname, 'public')));

// ✅ Routes
app.use("/auth", userRouter);
app.use("/post", blogRouter);

// ✅ Basic test route
app.get('/', (req, res) => {
  res.send('ScriptSphere Backend is Live!');
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
