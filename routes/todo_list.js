const express = require('express');
const { get_todo_list, modify_todo_list, create_todo_list, get_todo_list_all, get_todo_list_my, todo_list_recommend, todo_list_unrecommend, getTop3RecommendedTodoLists, modify_recommend_count } = require('../controllers/todo_list');
const { verifyToken } = require('../middlewares');
const router = express.Router();


// [POST] v1/todo_list/
router.post('/', verifyToken ,create_todo_list)

//[GET] v1/todo_list/
router.get('/all', verifyToken ,get_todo_list_all)

//[GET] v1/todo_list/
router.get('/my', verifyToken ,get_todo_list_my)

//[GET] v1/todo_list/top3
router.get('/top3', verifyToken, getTop3RecommendedTodoLists)

//[GET] v1/todo_list/:date
router.get('/:date', verifyToken, get_todo_list)

//[PATCH] v1/todo_list/:id/recommend
router.patch('/:id/recommend', verifyToken, modify_recommend_count)

//[PATCH] v1/todo_list/:id/share
router.patch('/:id', verifyToken, modify_todo_list)

//[GET] v1/todo_list/:id/recommend [list_id]
router.get('/:id/recommend', verifyToken, todo_list_recommend)

//[DELETE] v1/todo_list/:id/recommend [list_id]
router.delete('/:id/recommend', verifyToken, todo_list_unrecommend)


module.exports = router;