const express = require('express');
const { get_todo_ele, regist_todo_ele } = require('../controllers/todo_element');
const router = express.Router();


//[POST] v1/todo_element/
// router.post('/', regist_todo_ele)

//[GET] v1/todo_element/
// router.get('/', get_todo_ele)

//[GET] v1/todo_element/
router.get('/:date',get_todo_ele)

//[PATCH] v1/todo_element/
// router.patch('/:id', update_todo_element)

//[DELETE] v1/todo_element/
// router.delete('/:id', delete_todo_ele)







module.exports = router;