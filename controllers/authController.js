const User = require('../models/user')
const {StatusCodes} = require('http-status-codes')
const {attachCookiesToResponse} = require('../utils/jwt')
const jwt = require('jsonwebtoken')
const signUp  = async (req,res,next)=>{
    try{
        const {email,role} = req.body
        const emailexist = await User.findOne({email})
        if(emailexist)
            {
                res.status(StatusCodes.BAD_REQUEST).json({msg:'email alreday exist use different emailid'})
            }
        const user = await User.create(req.body)
        const tokenUser = {name:user.name , userid:user._id, role:user.role}
        
        attachCookiesToResponse({res,tokenUser})
        res.status(StatusCodes.CREATED).json({user:tokenUser})
    }
    catch(error)
    {
        next(error)
    }
}

const signin  = async (req,res)=>{
    try 
    {
        const {email,password} = req.body
        if(!email||!password)
        {
            res.status(StatusCodes.BAD_REQUEST).json({msg:'Please provide email and password'})
        }
        const user = await User.findOne({email})
        if(!user)
            {
                res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid creadentials'})
            }
        const ismatch = await user.comparePassword(password) 
        console.log(ismatch)   
        if(!ismatch)
            {
                res.status(StatusCodes.UNAUTHORIZED).json({msg:'Invalid password'})
            }
        const tokenUser = {name:user.name , userid:user._id, role:user.role}
        attachCookiesToResponse({res,tokenUser})
        res.status(StatusCodes.CREATED).json({user:tokenUser})
    } catch (error) {
        
    }
    
}

const logout  = async (req,res)=>{
    
        res.cookie('token','logout',{
            httpOnly:true,
            expires: new Date(Date.now()+10*1000)
        })
        res.status(StatusCodes.OK).json({msg:'user logout'})
    
    
}

module.exports = {signUp,signin,logout}