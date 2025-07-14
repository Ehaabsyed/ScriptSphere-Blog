import mongoose from "mongoose"
const BlogSchema=new mongoose.Schema({
    // 
    username:String,
    date:{
        type:Date,
        default:Date.now
    },
    image:{
        type:String,
    },
    title:String,
    content:String,
    category:String,
    likes:[{
        type:String,
        ref:"user"
    }]
   
})
const BlogModel=mongoose.model("Blog",BlogSchema)
export {BlogModel as Blog}