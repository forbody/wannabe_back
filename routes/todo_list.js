const express = require('express');
const { get_todo_list, modify_todo_list, create_todo_list, get_todo_list_all, get_todo_list_my } = require('../controllers/todo_list');
const { verifyToken } = require('../middlewares');
const router = express.Router();


// [POST] v1/todo_list/
router.post('/', verifyToken ,create_todo_list)

//[GET] v1/todo_list/
router.get('/all', verifyToken ,get_todo_list_all)

//[GET] v1/todo_list/
router.get('/my', verifyToken ,get_todo_list_my)

//[GET] v1/todo_list/:date
router.get('/:date', verifyToken, get_todo_list)

//[PATCH] v1/todo_list/:id
router.patch('/:id', verifyToken, modify_todo_list)



module.exports = router;