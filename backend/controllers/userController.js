const User = require('../models/userModel')

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

res.status(200).json({email, user})
}catch (error) {
res.status(400).json({error: error.message})
}

  }

  module.exports = {signupUser, loginUser}