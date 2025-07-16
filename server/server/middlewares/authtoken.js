// import jwt from 'jsonwebtoken'
// import cookieParser from 'cookie-parser';
// import { configDotenv } from 'dotenv';
// configDotenv()

// export const authtoken = async (req, res, next) => {
//     try {
//         const token = req.cookies.token
//         jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            
//             if (decoded) {
//                 return res.json({status:true,message:"User verified",user:decoded})
//                 next()
//             }else{
//                 res.json({status:false,message:"login to verify"})
//             }
            
//         });
//     } catch (error) {
//         console.log(error);

//     }
// }





import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
import { User } from '../models/user.js';
configDotenv()

export const authtoken = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    // console.log("token", token);
    
    if (!token) {
      return res.json({ status: false, message: "No token, authorization denied" });
    }

    jwt.verify(token, process.env.JWT_KEY, async (err, decoded) => {
      if (err) {
        return res.json({ status: false, message: "Token is not valid" });
      }

      // decoded contains username, email, etc from your token
      // Fetch full user info from DB
      const user = await User.findOne({ Email: decoded.email }); // exclude password

      if (!user) {
        return res.status(404).json({ status: false, message: "User not found" });
      }

      return res.json({status:true,message:"User verified",user:user})
      next();
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
};