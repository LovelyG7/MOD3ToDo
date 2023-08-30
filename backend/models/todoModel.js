const mongoose = require('mongoose');

const Schema = mongoose.Schema

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true
  },
  priority: {
    type: String, 
    required: false
  },
  timeCommitment: {
    type: Number, 
    required: false
  },
  completed: Boolean 
}, {timestamps: true})


// based on fruit app to see if works in postman
const Todo = mongoose.model('Todo', todoSchema);
module.exports= Todo;

//original way module.exports = mongoose.model('ToDo', todoSchema)

