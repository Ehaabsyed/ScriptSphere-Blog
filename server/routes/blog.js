import express from "express";
import { configDotenv } from "dotenv";
import { Blog } from '../models/blog.js'
import { User } from "../models/user.js";
configDotenv()

const router = express.Router();
router.post("/createblog", async (req, res) => {
    try {
        const { username, title, category, content, image } = req.body.payload
        // console.log(username,title, category, content );
        //get user
        const user = await User.findOne({ Username:username })
        
        await Blog.create({
            username,
            title,
            category,
            content,
            image
        })

            .then(doc => {
                user.blogs.push(doc._id)
                user.save()
                return res.json({ status: true, message: "Post successful", blog: doc });
            })
            .catch(err => {
                console.error(err);
                return res.status(500).json({ status: false, message: "Error creating blog" });
            });


    } catch (error) {
        console.log(error);
        return res.json({ status: false, message: "Internal server error" });
    }


})


export { router as blogRouter };
