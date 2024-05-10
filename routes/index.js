const express = require('express');
const router = express.Router();
const userRouter = require('./user');
const { createToken, join, refreshToken, kakaoLogin } = require('../controllers/auth');
const passport = require('passport');

// POST /v1/auth/join - 회원가입
router.post('/auth/join', join);

// POST /v1/auth/login - 로컬 로그인
router.post('/auth/login', createToken);

// 카카오 로그인
router.get('/auth/kakao', passport.authenticate('kakao'));
router.get('/auth/kakao/callback', kakaoLogin);

// POST /v1/auth/refresh - 새 토큰 발급
router.post('/auth/refresh', refreshToken);

// USE /v1/users
router.use('/users', userRouter); // v1뒤에 users를 붙여서 보낸다.


module.exports = router;