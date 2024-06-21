const jwt = require('jsonwebtoken')

const createToken = (payload)=>{
    const token = jwt.sign(payload,process.env.JWT_SECRET,{expiresIn:process.env.JWT_LIFE_TIME})
    return token
}

const attachCookiesToResponse = ({res,tokenUser})=>
    {
        const onday = 1000*24*60*60;
        const token = createToken(tokenUser)
        res.cookie('token',token,{
            httpOnly:true,
            expires: new Date(Date.now() + onday),
            secure:process.env.NODE_ENV=='production',
            signed:true,
            })
        //res.status(200).json({user:tokenUser})
    }

const isValidToken = ({token})=>{
    return jwt.verify(token,process.env.JWT_SECRET)
}

module.exports = {
    createToken,
    isValidToken,
    attachCookiesToResponse
}