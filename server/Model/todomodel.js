const mongoose=require("mongoose")


const todoschema=mongoose.Schema

const Todoschema=new todoschema({

   Activity:{type:String},
   Status:{type:String},
   Time:{type:String},
   Action:{type:String}

})

const Todo=new mongoose.model("todos",Todoschema)

module.exports=Todo