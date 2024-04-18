import mongoose from "mongoose"

let cart=new mongoose.Schema({
    Pid:{
      type:String,
      required:true
    },
    Pname:{
        type:String,
        required:true
    },
    Pcategory:{
        type:String,
        required:true
    },
    Pprice:{
        type:Number,
        required:true
    },
    Pquantity:{
        type:Number,
        required:true
    },
    Ppic:{
        type:String,
        default:"https://moonvillageassociation.org/wp-content/uploads/2018/06/default-profile-picture1.jpg"
    } ,
     sellerName:{
        type:String,
        required:true
    },
})

cart=mongoose.model("cart",cart)
export default cart