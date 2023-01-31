const mongoose=require('mongoose');

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        trim:true,
        unique:true,
        required:true
    },
    email:{
        type:String,
        minLength:15,
        unique:true,
        lowercase:true,
        required:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        trim:true
    }
},{versionKey:false,timestamps:true});

module.exports=mongoose.model("User",userSchema)