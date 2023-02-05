const router=require("express").Router()

const todomodel=require("../Model/todomodel")
const bcrypt=require("bcrypt")
const usermodel=require("../Model/usermodel")
const jwt=require("jsonwebtoken")
const nodemailer=require("nodemailer")

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

           let valid=false
        //     generating verifying code

        let unistr=""

        for(let i=0;i<8;i++){

            unistr+=parseInt(Math.random()*10+1)

        }

          

        //    .......................//.........................................

        const newuser=await usermodel.create({email:req.body.email,valid:valid,verifynum:unistr,password:haspass})

        res.json({user:newuser})

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            port: 587,
            auth: {
                user: 'saikirangaduparthi999@gmail.com',
                pass: 'frbwsjuuncodrezd'
            }
        });
            // 

              const info = await transporter.sendMail({
                  from: '"kiran industries" <myemail@gmail.com>',
                  to: newuser.email,
                  text: "welcome to the family",
                  html: `<h1>welcome to the family</h1><h3>press <a href=http://localhost:5000/user/verify/${unistr}>here</a> to  verify your email</h3><img src='https://media.tenor.com/AvHPuvcRU4wAAAAi/cute-penguin.gif' alt=img></img>`


              },(err,info)=>{

               if(err){
                console.log(err)

               }
               else{
                
               }
              })
         

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


// verify email by nodemailer




router.get("/verify/:string",async(req,res)=>{

const str=req.params.string

try{

    const user=await usermodel.findOne({verifynum:str})
    
    
    if(user){
      
       
        user.valid=true
        
//   user.save()    

       await user.save()
       
        // res.json({result:"user email verification is sucessfull"})

   res.redirect("http://localhost:3000/verify")
      
    }else{
        res.json("user not found")
    }
    

  

}
catch(e){
    res.json({
        message:e.message
    })
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
