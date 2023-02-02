import React, { useEffect, useState } from 'react'
import "./home.css"
import Nav from './nav'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import Sidebar from './sidebar';
export default function Home(props) {
    const navigate=useNavigate()

    const [user,setuser]=useState()
    const[alltodo,setalltodo]=useState()

    const [Todo,setTodo]=useState({


        Activity:"",
        Status:"",
        Time:"",
        Action:""


    })
    
    useEffect(()=>{
        
        async function main(){
            

            const headers={
                "Authorization":sessionStorage.getItem("token")}
           

            

            

         const res=await axios.post("http://localhost:5000/user/logedin",headers)


               
            setuser(res.data)
           
        

        }


     main()


    },[])



useEffect(()=>{

   async function get(){

        const res=await axios.get("http://localhost:5000/user/todo")

        setalltodo(res.data.data)
    }
 


get()


},[Todo])



async function addtodo(){

const res=await axios.post("http://localhost:5000/user/todo",Todo)

setTodo(res.data)
   
}



if(!sessionStorage.getItem("token")){
    navigate("/user/signin")
}



  return (
    <div className='home-page'>
    
    <Nav username={user?user:""}/>

       <Sidebar alltodo={alltodo}/>
      


<div style={{display:"inline-block",position:"absolute",backgroundColor:"rgb(151, 151, 151)",marginLeft:"20%",height:"1000px",width:"100%"}}>

<button onClick={()=>{addtodo()}} >ADDTODO</button><br/>




    <input type="text" placeholder='Activity' onChange={(e)=>{setTodo({...Todo,Activity:e.target.value})}}></input>

    <input type="text" placeholder='status' onChange={(e)=>{setTodo({...Todo,Status:e.target.value})}}></input>
 
      <input type="number" placeholder='Time' onChange={(e)=>{setTodo({...Todo,Time:e.target.value})}}></input>  
      <input type="text" placeholder='Action' onChange={(e)=>{setTodo({...Todo,Action:e.target.value})}}></input>  


   <table>
   <tr>
   <th  style={{backgroundColor:"blue"}}>Activity</th>
   <th  style={{backgroundColor:"blue"}}>Status</th>
   <th  style={{backgroundColor:"blue"}}>Time taken</th>
   <th  style={{backgroundColor:"blue"}}>Action</th>
   </tr>
   
   {alltodo?alltodo.map(data=>{


    return(

        <tr>
        <td>{data.Activity}</td>
        <td>{data.Status}</td>
        <td>{data.Time}</td>
        <td>{data.Action}</td>

        
        </tr>
    )
   })

   :""}
   
   
   
   
   </table>
      
  


  












</div>
    
   
    
    
    

    
    </div>
  )
}
