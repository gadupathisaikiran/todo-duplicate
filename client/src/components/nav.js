import React from 'react'

import { useNavigate } from 'react-router-dom'

export default function Nav(props) {

    const navigate=useNavigate()

    function logout(){


       sessionStorage.clear()

       
      
        
           navigate("/")


        }
        





  let email=props.username.email


  return (
    <div style={{width:"1400px",backgroundColor:"wheat",height:"10%",position:"relative"}}>
    
    <h3 style={{marginLeft:"60%"}}>{email?email.slice(0,15):""}</h3>
    
    
    <button style={{marginLeft:"90%",color:"white",backgroundColor:"blue",cursor:"pointer"}} onClick={()=>{logout()}}>LOGOUT</button>
    </div>
  )
}
