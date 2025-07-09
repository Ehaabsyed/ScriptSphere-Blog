import jwt from 'jsonwebtoken'
import cookieParser from 'cookie-parser';
import { configDotenv } from 'dotenv';
configDotenv()

export const authtoken = async (req, res, next) => {
    try {
        const token = req.cookies.token
        jwt.verify(token, process.env.JWT_KEY, function (err, decoded) {
            if (decoded) {
                return res.json({status:true,message:"User verified",user:decoded})
            }else{
                res.json({status:false,message:"login to verify"})
            }
            
        });
    } catch (error) {
        console.log(error);

    }
}