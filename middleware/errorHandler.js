const {StatusCodes} = require('http-status-codes')
const errorHandlerMiddleware = (err,req,res,next)=>{
    let customError = {
        statusCode: err.statusCode||StatusCodes.INTERNAL_SERVER_ERROR,
        msg: err.message || 'Something went wrong try after sometime'
    }
    if(err.name === 'ValidationError')
        {
            customError.msg = Object.values(err.errors)
            .map((item)=>iteam.message)
            .join(',') 
            customError.statusCode = 400;  
        }
    res.send(customError)    
}

module.exports = errorHandlerMiddleware