import mongoose from "mongoose";
let account=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
    },
    email:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
    },
    phone:{
        type:String,
        required: [true, "Passowrd is Required"],
    },
    password:{
        type:String,
        required:true
    },
    Type:{
        type:String,
        required:true,
        lowercase: true,
        trim: true,
    }
})
account=mongoose.model("Account",account)
export default account;