const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const { upload_todo_list, modify_share_comment , delete_share_comment} = require('../controllers/share');

// [POST] /v1/todo_list/share/
router.post('/', verifyToken, upload_todo_list);

// [PATCH] /v1/todo_list/share/:id (share_comment_id)
router.patch('/:id', verifyToken, modify_share_comment)

// [DELETE] /v1/todo_list/share/:id
router.delete('/:id', verifyToken, delete_share_comment)

module.exports = router;