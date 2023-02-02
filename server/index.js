const express = require("express")

const mongoose = require("mongoose")
const dotenv=require("dotenv")
const cors=require("cors")

dotenv.config()

const app = express()

app.use(cors())
const bodyparser = require("body-parser")

app.use(bodyparser.json())


app.use(bodyparser.json())

app.use("/user",require("./Routes/user"))

async function main(){
await mongoose.connect("mongodb+srv://test-2:test-2@cluster0.bgdbs80.mongodb.net/?retryWrites=true&w=majority").then(()=>{console.log("connected to Db")}).catch((e)=>{console.log(e)})


}

main()

app.listen(5000,()=>{console.log("Port is lesting at 5000")})