import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    Username: {
        type: String,
        required: true
    },
    Email: {
        type: String,
        required: true
    },
    Password: {
        type: String,
        required: true
    },
})

const UserModel=mongoose.model("User",UserSchema)
export {UserModel}