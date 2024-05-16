const express = require('express');
const router = express.Router();
const { getUsers, getUser, modifyUser, deleteUser, addUserDetail, uploadUserImg, getLikings, getLikers, like, unlike } = require('../controllers/user')
const { verifyToken } = require("../middlewares")
const multer = require('multer');
const path = require('path')

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, "public/uploads")
    },
    filename(req, file, cb) {
        const ext = path.extname(file.originalname);
        cb(null, path.basename(file.originalname, ext) + Date.now() + ext);
    }
});
const limits = { fileSize: 10 * 1024 * 1024 };
const imgUpload = multer({
    storage,
    limits
});

// GET /v1/users/ - 모든 유저 정보 조회 [완료]
// router.get('/', verifyToken, getUsers)

// GET /v1/users/:id - 특정 유저 정보 조회 [완료]
router.get('/:id', verifyToken, getUser)

// PATCH /v1/users/ - 유저 정보 수정 [완료]
router.patch('/', verifyToken, modifyUser)

// DELETE /v1/users/ - 유저 삭제 [완료]
router.delete('/', verifyToken, deleteUser)

// POST /v1/users/ - 유저 세부 정보 추가 [완료]
router.post('/', verifyToken, addUserDetail)

// POST /v1/users/image - 유저 세부 정보 이미지 업로드
router.post('/image', imgUpload.single('img'), uploadUserImg)

// POST /v1/users/like - 유저 좋아요 [완료]
router.post('/like', verifyToken, like)

// DELETE /v1/users/like - 유저 좋아요 취소 [완료]
router.delete('/like', verifyToken, unlike)

// GET /v1/users/like/:id - 나를 좋아요 한 유저 조회 [완료]
router.get('/likers/:id', verifyToken, getLikers)

// GET /v1/users/like/:id - 내가 좋아요 한 유저 조회 [완료]
router.get('/likings/:id', verifyToken, getLikings)

module.exports = router;