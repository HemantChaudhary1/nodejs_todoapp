import mongoose from "mongoose";

const schema = new mongoose.Schema({   //In schema we get to know the type of data which is stored
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        select:false,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
 });
 
 export const User = mongoose.model("USer",schema); // In model (it is like a container) data is stored of type which has been declared in schema and model is assigned to a variable User
 