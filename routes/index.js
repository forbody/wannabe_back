const express = require('express');
const router = express.Router();
const todoEleRouter = require('./todo_element')
const todoListRouter = require('./todo_list')
const foodRouter = require('./food')



// /v1/todo_element
router.use('/todo_element', todoEleRouter)

// /v1/todo_list
router.use('/todo_list', todoListRouter)

// /v1/food
router.use('/food', foodRouter)

module.exports = router;