const router=require("express").Router()

const todomodel=require("../Model/todomodel")
const bcrypt=require("bcrypt")
const usermodel=require("../Model/usermodel")
const jwt=require("jsonwebtoken")


const bodyparser=require("body-parser")

router.use(bodyparser.json())

let id;



//  is logged in......................................../......................




router.post("/logedin",async(req,res)=>{



try{
    const token=req.body.Authorization

   
    
    const verifyuser= await jwt.verify(token,"shhhhh")

    if(verifyuser){

        console.log(verifyuser)

        const ID=verifyuser.id
        
        const user=await usermodel.findOne({_id:ID})
        
        console.log(user)

            res.status(200).json(user)

            
    }
  
   


}

catch(e){
    res.status(403).json("NOT LOGEDIN")



}



})




// signup.............../.........................................................

router.post("/signup",async(req,res)=>{

    try{
   

     if(req.body){
const haspass=await bcrypt.hash(req.body.password,10)



        const newuser=await usermodel.create({email:req.body.email,password:haspass})

        res.json({user:newuser})
     }
       else{
        res.json({
            message:"enter details"
        })
       }

        

    }
    catch(e){
     
  res.json({message:e.message})


    }


})


// sign in..........................................................................


router.post("/signin",async (req,res)=>{

    try{
      

        const user=await usermodel.findOne({email:req.body.email})

        if(!user){

          return  res.json({

            message:"please sigup first.>>>>"
          }
           
            )


        }
        if(user){

            const comparepass=await bcrypt.compare(req.body.password,user.password)

        
             console.log(comparepass)
         


if(!comparepass){
    return res.status(400).json({message:"invalid password"})
}
       
else{
    const token=jwt.sign({id:user._id},"shhhhh")

         


    res.status(200).json({
    token:token,
    user:user
    })



}

        }

    }
    catch(e){

        res.json({
            message:e.message
        })
    }




})


router.post("/todo",async(req,res)=>{

try{
    const data=await todomodel.create(req.body)

    res.json({
        data
    })
}
   
catch(e){
    res.json({message:e.message})
}




})


// get all todo



router.get("/todo",async(req,res)=>{

    try{
        const data=await todomodel.find({})
    
        res.json({
            data
        })
    }
       
    catch(e){
        res.json({message:e.message})
    }
    
    
    
    
    })








module.exports=router