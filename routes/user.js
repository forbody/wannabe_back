const express = require('express');
const router = express.Router();
const { getUsers, getUser, modifyUser, modifyRoleModel, deleteUser, addUserDetail, uploadUserImg, getLikings, getLikers, like, unlike, getRandomRoleModels } = require('../controllers/user')
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

// GET v1/users/random-rolemodel - 랜덤 셀러브리티 3명 가져오기 [완료]
router.get('/random-rolemodel', verifyToken, getRandomRoleModels);

// GET /v1/users/ - 모든 유저 정보 조회 [완료]
router.get('/', verifyToken, getUsers)

// PATCH /v1/users/rolemodel - 유저 롤모델 정보 수정 [완료]
router.patch('/rolemodel', verifyToken, modifyRoleModel)

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

// GET /v1/users/:id/like - 나를 좋아요 한 유저 조회 [완료]
router.get('/:id/likers', verifyToken, getLikers)

// GET /v1/users/:id/like - 내가 좋아요 한 유저 조회 [완료]
router.get('/:id/likings', verifyToken, getLikings)

// GET /v1/users/:id - 특정 유저 정보 조회 [완료]
router.get('/:id', verifyToken, getUser)

module.exports = router;