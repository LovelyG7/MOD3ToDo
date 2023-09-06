const express = require('express');
const { 
  getTodos, 
  getTodo, 
  createTodo,
  deleteTodo,
  updateTodo
 } = require('../controllers/todoController')
 const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

//require auth for all to-do routes
router.use(requireAuth)

//GET all to-dos
router.get('/', getTodos)


//GET a single to-do
router.get('/:id', getTodo)

//POST a new to-do
router.post('/', createTodo);

//DELETE a new to-do
router.delete('/:id', deleteTodo);

//UPDATE a new to-do
router.patch('/:id', updateTodo);


module.exports = router