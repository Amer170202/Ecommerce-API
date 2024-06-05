const express = require('express')
const routes = express.Router()

const {signUp,signin,logout} = require('../controllers/authController')

routes.post('/signup',signUp)
routes.post('/signin',signin)
routes.get('/logout',logout)

module.exports = routes