const mongoose=require("mongoose")


const userschema=mongoose.Schema

const Userschema=new userschema({

    email:{type:String,unique:true},
    password:{type:String}

})

const User=new mongoose.model("users",Userschema)

module.exports=User