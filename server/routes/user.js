import express from 'express'
import bcrypt from 'bcrypt'
import {userModel} from '../models/user.js'
const router=express.Router()

router.post("/user",(req,res)=>{
    const userInfo=req.body.data
    
    
})
export {router as userRouter}