const express = require('express');
const { 
  getTodos, 
  getTodo, 
  createTodo,
  deleteTodo,
  updateTodo
 } = require('../controllers/todoController')

const Todo = require('../models/todoModel')

const router = require('express').Router();

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