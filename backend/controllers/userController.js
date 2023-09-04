const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

//create reusable function
const createToken = (_id) => {
  return  jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' } )
 }

//login user
const loginUser = async (req,res) => {
res.json({mssg: 'login user'})
}

//signup user
const signupUser = async (req,res) => {
//grab email and password from req body
const {email, password} = req.body
//use try catch block when trying to sign user up
try{
const user = await User.signup(email, password)

//create a token after they've been saved to db
const token = createToken(user._id)

//pass token back to browser
res.status(200).json({email, token})
}catch (error) {
res.status(400).json({error: error.message})
}

  }

  module.exports = {signupUser, loginUser}