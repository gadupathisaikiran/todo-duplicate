import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Sidebar(props) {
   
    const navigate=useNavigate()

const alltodo=props.alltodo

     

  return (
    <div  style={{display:"inline-block",width:"20%",height:"1000px",backgroundColor:"yellow",position:"absolute"}}>
    <h1>Todo history</h1>
    <h2>HISTORY</h2>
    
{
    alltodo?alltodo.map(data=>{

        if(data.Time){
            return(
                <div style={{display:"inline"}}>
                <h3>{data.Activity}</h3>
                <h3>{data.Time}</h3>
                </div>
               
            )
        }
       


    })


:""}

    
       
    </div>
  )
}
