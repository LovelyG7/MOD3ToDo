const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const Schema = mongoose.Schema

const userSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
})


//static signup method
userSchema.statics.signup = async function (email, password){
  //signup logic
  //1. check if email exists in db

  const exists = await this.findOne({ email })

  if (exists) {
    throw Error('Email already in use')
  }

//generate salt using await bc it takes time . Pass in number of rounds, the higher the number the longer it will take potential hackers to crack passwords but also takes longer for users to signup as well so pick a balanced number. Default value is 10
const salt = await bcrypt.genSalt(10)
const hash = await bcrypt.hash(password, salt)

//store salted-hash in db with user's email by creating document
const user = await this.create({ email, password: hash })

return user
}

module.exports = mongoose.model('USer', userSchema)