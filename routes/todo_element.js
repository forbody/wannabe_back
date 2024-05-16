const express = require('express');
const { get_todo_ele, create_todo_ele, update_todo_ele, delete_todo_ele, share_todo_list,update_ele_recur, update_ele_achieve } = require('../controllers/todo_element');
const { verifyToken } = require('../middlewares');
const router = express.Router();


//[POST] v1/todo_element/
router.post('/', verifyToken ,create_todo_ele)

//[GET] v1/todo_element/
// router.get('/', get_todo_ele)

//[GET] v1/todo_element/
router.get('/:id', verifyToken ,get_todo_ele)

//[PATCH] v1/todo_element/recur/:id
router.patch('/recur/:id', verifyToken , update_ele_recur)

//[PATCH] v1/todo_element/achieve/:id
router.patch('/achieve/:id', verifyToken , update_ele_achieve)

//[PATCH] v1/todo_element/:id
router.patch('/:id', verifyToken , update_todo_ele)

//[DELETE] v1/todo_element/
router.delete('/:id',verifyToken, delete_todo_ele)

//[POST] v1/todo_element/
router.post('/share',verifyToken, share_todo_list)







module.exports = router;