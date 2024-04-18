import mongoose from "mongoose";

let addProduct=new mongoose.Schema({
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
    Punit:{
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
addProduct=mongoose.model("Products",addProduct)

export default addProduct;