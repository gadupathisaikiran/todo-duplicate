import React from 'react'
import { useNavigate } from 'react-router-dom'
import Confetti from 'react-confetti'
export default function Verify() {
  const navigate=useNavigate()


setTimeout(()=>{

navigate("/")

},5000)


  return (
    <div style={{backgroundColor:"white"}}>

    <Confetti numberOfPieces={900}></Confetti>
    <img src='https://cdn.dribbble.com/users/6659664/screenshots/15750262/media/82e52180ea4c63de9e6d5bbcce5b8336.png?compress=1&resize=1000x750&vertical=top'></img>
    
    </div>
  )
}
