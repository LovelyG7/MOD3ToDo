require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const todoRoutes = require('./routes/to-dos')
const userRoutes = require('./routes/user')

//express app
const app = express()

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

// Set Cache-Control for all responses
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-store'); // Prevent caching for all routes
  next();
});

//routes
app.use('/api/to-dos', todoRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
     //listen for requests
  app.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT);
  }) 
})
.catch((error)=>{
  console.log(error);
})