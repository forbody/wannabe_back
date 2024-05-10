const express = require('express');
const { delete_todo_list, get_todo_list, modify_todo_list } = require('../controllers/todo_list');
const router = express.Router();


//[POST] v1/todo_list/
// router.post('/', )

//[GET] v1/todo_list/
// router.get('/', get_todo_ele)

//[GET] v1/todo_list/
router.get('/:id', get_todo_list )

//[PATCH] v1/todo_list/
router.patch('/:id', modify_todo_list)

//[DELETE] v1/todo_list/    
router.delete('/:id', delete_todo_list)







module.exports = router;