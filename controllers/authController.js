const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const signUp  = async (req,res,next)=>{
    try{
        const {email,role} = req.body
        const emailexist = await User.findOne({email})
        if(emailexist)
            {
                res.status(StatusCodes.BAD_REQUEST).json({msg:'email alreday exist use different emailid'})
            }
        const user = await User.create(req.body)
        res.status(StatusCodes.CREATED).json({user})
    }
    catch(error)
    {
        next(error)
    }
}

const signin  = async (req,res)=>{
    res.send('signin user')
}

const logout  = async (req,res)=>{
    res.send('logout User')
}

module.exports = {signUp,signin,logout}