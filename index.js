require('dotenv').config()
const express = require('express')
const connectDB = require('./db/connect')
const notFound = require('./middleware/notFound')
const errorHandler = require('./middleware/errorHandler')
const morgan = require('morgan')
const authRouter = require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const app = express()

const port = process.env.PORT || 5000

app.use(morgan('tiny'))
app.use(express.json())
app.use(cookieParser(process.env.JWT_SECRET))
app.get('/',(req,res)=>
{
    //console.log(req.cookies)
    console.log(req.signedCookies)
    res.send("Calling get")
});
app.use('/api/v1/',authRouter)
app.use(notFound)
app.use(errorHandler)
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