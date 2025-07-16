import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
import { userRouter } from './routes/user.js'
import { blogRouter } from './routes/blog.js'
import ConnectDB from './db/database.js'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()
const app = express()
ConnectDB()

// ✅ Must come BEFORE routes and static middleware
app.use(cors({
  origin: [
    "http://localhost:5173",
    "https://script-sphere-blog.vercel.app"
  ],
  credentials: true,
}));



// ✅ Middleware setup
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/auth", userRouter);
app.use("/post", blogRouter);

app.get('/', (req, res) => {
  res.send("Hello from backend again");
});
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/dist', 'index.html'));
});
app.listen(process.env.PORT || 5000, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
