const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'Please provide the name of user'],
        minlength:3,
        maxlength: 50
    },
    email:{
        type: String,
        required: [true,'Please provide the email'],
        validate:
        {
            validator: validator.isEmail,
            message:'Please Provide valid email'
        }
    },
    password:{
        type: String,
        required: [true,'Please provide the Password']
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'
    }
    
})

userSchema.pre('save',async function(){
    console.log("in hash")
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,salt)
})

module.exports = mongoose.model('User',userSchema)