
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css"
import Home from "./components/home";
import Signin from "./components/signin";
import Signup from "./components/signup";
import Verify from "./components/verify";

function App() {
  return (
    <div className="App-header">

      <BrowserRouter>

        <Routes>
    
    
    
          <Route path="/user/signup" element={<Signup/>} />
          <Route path="/" element={<Signin/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/verify" element={<Verify/>} />



            



        </Routes>



      </BrowserRouter>




    </div>
  );
}

export default App;
