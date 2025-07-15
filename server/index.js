import express from 'express'
import cors from'cors'
import { configDotenv } from 'dotenv';
import { userRouter } from './routes/user.js';
import ConnectDB from './db/database.js'
import cookieParser from 'cookie-parser';
import { blogRouter } from './routes/blog.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current file path
const __filename = fileURLToPath(import.meta.url);
// Get directory path of current file
const __dirname = path.dirname(__filename);
configDotenv()

const app = express()
ConnectDB()

app.use(express.json())    
app.use(express.static(path.join(__dirname, 'public')));

app.use(cors({
  origin:[
  "http://localhost:5173",
  "https://script-sphere-bice.vercel.app"
],
  credentials:true
}))
app.use(cookieParser())
app.use("/auth",userRouter)
app.use("/post",blogRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT} `)
})
