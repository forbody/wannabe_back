const express = require('express');
const router = express.Router();
const { getUsers, getUser, modifyUser, deleteUser, addUserDetail, getLikings, getLikers, like, unlike } = require('../controllers/user')
const { verifyToken } = require("../middlewares")

// GET /v1/users/ - 모든 유저 정보 조회 [완료]
router.get('/', verifyToken, getUsers)

// GET /v1/users/:id - 특정 유저 정보 조회 [완료]
router.get('/:id', verifyToken, getUser)

// DELETE /v1/users/ - 유저 삭제
router.delete('/', verifyToken, deleteUser)

// PATCH /v1/users/ - 유저 세부 정보 수정
router.patch('/', verifyToken, modifyUser)

// POST /v1/users/ - 유저 세부 정보 추가 [완료]
router.post('/', verifyToken, addUserDetail)

// POST /v1/users/like - 유저 좋아요
router.post('/like', verifyToken, like)

// DELETE /v1/users/like - 유저 좋아요 취소
router.delete('/like', verifyToken, unlike)

// GET /v1/users/like/:id - 나를 좋아요 한 유저 조회
router.get('/likiers/:id', verifyToken, getLikers)

// GET /v1/users/like/:id - 내가 좋아요 한 유저 조회
router.get('/likings/:id', verifyToken, getLikings)

module.exports = router;