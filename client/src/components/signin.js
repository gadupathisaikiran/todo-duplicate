import React, { useState } from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

export default function Signin() {

    const navigate=useNavigate()

const [user,setuser]=useState({email:"",
password:""
})

const [Userdata,setUserdata]=useState()



async function signin(userdata)
{
    try{
        const res=await axios.post("https://todo-backend-app-b60i.onrender.com/user/signin",userdata)

       
        console.log(res)
     
     //    navigate("/user/signin")
     if(res){
        console.log(res.data.user)

        setUserdata(res.data.user)

      
        sessionStorage.setItem("token",res.data.token)

             

if(!res.data.message){

    alert("Signin sucess")

        navigate("/home")


}
else{
    alert("email or password is wrong")

}

     }if(!res){
        alert("invalid password or email")
     }
        

    }
    catch(e){
        console.log(e.message)

        alert("invalid password")
    }

 
}



function submit(){

const emailreg=new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)
if(user){



if(!user.email.match(emailreg)){
    alert("not a valid email")
}


else{
    signin(user)
    
}




}
}



  return (
    <div className='register'>


    <h1>SIGNIN</h1>

    <input type="email" placeholder='email' style={{width:"300px",height:"30px",fontSize:"22px",marginBottom:"20px"}} onChange={(e)=>{setuser({...user,email:e.target.value})}}></input><br/>

     <input type="text" placeholder='password' style={{width:"300px",height:"30px",fontSize:"22px",marginBottom:"20px"}} onChange={(e)=>{setuser({...user,password:e.target.value})}}></input><br/>



    
    
    
      <button  style={{width:"100px",height:"30px",fontSize:"22px",marginBottom:"20px"}} onClick={()=>{submit()}}>signin</button><br/>
      <button  style={{width:"100px",height:"30px",fontSize:"22px",marginBottom:"20px"}} onClick={()=>{navigate("/user/signup")}}>signup</button>
    
    
    </div>
  )
}
