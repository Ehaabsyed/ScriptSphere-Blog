import express from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.js";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
import {authtoken} from '../middlewares/authtoken.js'
configDotenv()

const router = express.Router();

router.post("/signup", async (req, res) => {
    try {
        const { email, name, username, password } = req.body.data;   // destructure for clarity

        // 1️⃣  Check for duplicates (use findOne or exists; both are fast)
        const exists = await User.exists({ Email: email });
        if (exists) {
            return res.json({ status: false, message: "User already registered!" });
        }

        // 2️⃣  Hash the password
        const hash = await bcrypt.hash(password, 10);

        // 3️⃣  Create & save the new user
        await User.create({
            Name: name,
            Username: username,
            Email: email,
            Password: hash,
        });

        return res.json({ status: true, message: "User successfully registered" });
    } catch (err) {
        console.error(err);
        return res.json({ status: false, message: "Internal server error" });
    }
});

//login route
router.post("/login", async (req, res) => {
    const { username, password } = req.body.data

    // 1️⃣  Check for duplicates (use findOne or exists; both are fast)
    const existingUser = await User.findOne({ Username: username });
    if (!existingUser) {
        return res.json({ status: false, exist: false, message: "User not found!" });
    }

    // Load hash from your password DB.
    const isMatch = await bcrypt.compare(password, existingUser.Password);
    if (!isMatch) {
        return res.json({ status: false, message: "password incorrect" })
    }
    const token = jwt.sign({ username: existingUser.Username,name:existingUser.Name,email:existingUser.Email }, process.env.JWT_KEY, { expiresIn: "24h" })
    res.cookie("token", token,{httpOnly:true,maxAge:3600000})
    return res.json({ status: true, message: "logged In",existingUser })
})
router.get("/logout",(req,res)=>{
  res.clearCookie("token")
  return res.json({status:true,message:"logged out"})
})
router.get("/me",authtoken,(req,res)=>{
   
    return res.json({status:true,message:"protected"})
})

export { router as userRouter };
