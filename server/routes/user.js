import express from "express";
import bcrypt from "bcrypt";
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

import { User } from "../models/user.js";
import { Blog } from "../models/blog.js";
import jwt from 'jsonwebtoken'
import { configDotenv } from "dotenv";
import { authtoken } from '../middlewares/authtoken.js'
import multer from "multer";
import path from "path";
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
    const token = jwt.sign({ username: existingUser.Username, name: existingUser.Name, email: existingUser.Email }, process.env.JWT_KEY, { expiresIn: "24h" })
    res.cookie("token", token, { httpOnly: true, maxAge: 3600000,secure:true,sameSite:'None' })
    return res.json({ status: true, message: "logged In", existingUser })
})
router.get("/logout", (req, res) => {
    res.clearCookie("token")
    return res.json({ status: true, message: "logged out" })
})
router.get("/me", authtoken, (req, res) => {

    return res.json({ status: true, message: "protected" })
})
//get all blogs
router.get("/getblogs", async (req, res) => {
    // When sending blogs
const blogs = await Blog.find().lean();

const enrichedBlogs = await Promise.all(
  blogs.map(async (blog) => {
    const user = await User.findOne({ Username: blog.username }).lean();
    return {
      ...blog,
      authorImage: user?.image || "default.webp"
    };
  })
);

res.json({status:true,message:"sent all blogs", blogs: enrichedBlogs });

})

//get user blogs
router.post("/getuserblogs", async (req, res) => {

    try {
        const { username } = req.body;
        Blog.find({ username:username })
            .then(blogs => {

              
                if (blogs) {
                    res.json({ status: true, message: "Users blogs send to ui", blogs })
                } else {
                    res.json({ status: false, message: "No users blogs" })

                }

            })
            .catch(err => {
                res.json({ status: false, message: "Internal server error", err })

            })
    } catch (error) {
        console.log(error);

    }
})
//view blog
router.post("/viewblog", async (req, res) => {
    try {
        const { id } = req.body
        Blog.findOne({ _id: id })
            .then(blog => {
                if (blog) {
                    res.json({ status: true, message: "Viewing Blog sent", blog })
                }
                else {
                    res.json({ status: false, message: "No blog found on this id" })
                }
            })
            .catch(err => {
                res.json({ status: false, message: "internal server error" })
            })
    } catch (error) {
        console.log(error);

    }


})
// routes/blog.js or wherever you're handling blog routes
router.get("/top-liked", async (req, res) => {
  try {
    const topBlogs = await Blog.aggregate([
      {
        $addFields: {
          likesCount: { $size: "$likes" } // add a virtual field
        }
      },
      {
        $sort: { likesCount: -1 } // sort by likes descending
      },
      {
        $limit: 3 // limit to top 3
      }
    ]);

    res.status(200).json({ blogs: topBlogs });
  } catch (error) {
    console.error("Error fetching top blogs:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../public/profile-Images'));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})

const upload = multer({ storage: storage })
//upload pf
router.post("/upload-profile",upload.single('profile-image'),async (req,res)=>{
    
    try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "No file uploaded" });
    }

    const userEmail = req.body.email; // email sent from frontend

    if (!userEmail) {
      return res.status(400).json({ status: false, message: "User email is required" });
    }

    // Find and update user by email
    const updatedUser = await User.findOneAndUpdate(
      { Email: userEmail },
      { image: `/profile-Images/${req.file.filename}` },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ status: false, message: "User not found" });
    }

    res.json({
      status: true,
      message: "Profile picture uploaded and updated successfully",
      user: updatedUser
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: "Server error" });
  }
});
//send user details
router.post("/getuserdetail", async (req, res) => {
    try {
        const { username } = req.body
        const user = await User.findOne({ Username: username })
        const userBlogs = await Blog.find({ username })
        // console.log(user);
        // console.log(userBlogs);
        if (user) {
            res.json({ status: true, message: "user details sent", user, userBlogs })
        } else {
            res.json({ status: false, message: "user details not found" })
        }
    } catch (error) {
        console.log(error);
    }
})
//like blog
router.post("/bloglike", async (req, res) => {
    try {
        const { username,id } = req.body

        // console.log(userid.id.toString('hex'));
        
        const blog = await Blog.findOne({ _id:id })
        // console.log(blog,username)
        // console.log(blog);
        if (blog) {

            if (blog.likes.includes(username)) {
                blog.likes.pull(username)
                await blog.save()
                res.json({ status: false, message: "blog unliked" })

            } else {
                blog.likes.push(username)
                await blog.save()
                res.json({ status: true, message: "blog liked" })

            }
            
        }

    } catch (error) {
        console.log(error);

    }




})
//delete blog
router.post("/deleteblog", (req, res) => {
    try {
        const { id } = req.body
        Blog.findOneAndDelete({ _id: id })
            .then(blog => {
                // console.log(res);
                res.json({ status: true, message: "blog deleted Succesfully", blog })
            })
            .catch(err => {
                res.json({ status: false, message: "check if the blog exists" })
            })
    } catch (error) {
        console.log(error);
    }
})

export { router as userRouter };
