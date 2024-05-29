const express = require('express');
const { delete_todo_list, get_todo_list, modify_todo_list, create_todo_list, get_todo_list_all, get_todo_list_my } = require('../controllers/todo_list');
const { verifyToken } = require('../middlewares');
const router = express.Router();


// [POST] v1/todo_list/
router.post('/', verifyToken ,create_todo_list)

//[GET] v1/todo_list/
router.get('/all', verifyToken ,get_todo_list_all)

//[GET] v1/todo_list/
router.get('/my', verifyToken ,get_todo_list_my)

//[GET] v1/todo_list/ date를 파람으로넣어줘도되나..?
router.get('/:date', verifyToken, get_todo_list)

//[PATCH] v1/todo_list/:id
router.patch('/:id', verifyToken, modify_todo_list)

//[DELETE] v1/todo_list/:id  // 굳이 필요는없을듯..?
router.delete('/:id',verifyToken, delete_todo_list)



module.exports = router;