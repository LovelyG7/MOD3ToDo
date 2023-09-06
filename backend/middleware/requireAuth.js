const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
//get access to request, response and next- REMEMBER we invoke the next function to move on to the next piece of middleware or the next handler.For example, the GET all todos, GET single todo, DELETE/UPDATE todo routes in the to-dos.js  model
const requireAuth = async (req, res, next) => {

//verify user authentication- by using authorizaion headers property from the request (like: content type is application json)
  const { authorization } = req.headers

  if (!authorization) {
    return res.status(401).json({error: 'Authorization token required'})
  }
//authorization comes back as a string saying 'Bearer ddklhdksfh.hkldjlkdsjf.dfhlhihr' <---token is in position [1]
  const token = authorization.split(' ')[1]

  try {
    const { _id } = jwt.verify(token, process.env.SECRET)

    req.user = await User.findOne({ _id }).select('_id')
    next()

} catch (error){
console.log(error)
res.status(401).json({error:'Request is not authorized'})
}
}
module.exports = requireAuth