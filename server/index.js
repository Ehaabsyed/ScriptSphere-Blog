import express from 'express'
import cors from'cors'
import { configDotenv } from 'dotenv';
import { userRouter } from './routes/user.js';
import ConnectDB from './db/database.js'
configDotenv()

const app = express()
ConnectDB()

app.use(express.json())    
app.use(cors())
app.use("/auth",userRouter)


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(process.env.PORT || 5000, () => {
  console.log(`Example app listening on port ${process.env.PORT} `)
})
