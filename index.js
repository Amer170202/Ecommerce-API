require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const app = express()

const port = process.env.PORT || 5000
const start = async()=>{
    try
    {
        await connectDB(process.env.MONO_URL)
       return  app.listen(port,console.log(`server is listing on port  ${port}`))
    }
    catch(error)
    {
        console.log(error)
    }
}

start()
console.log("hd")