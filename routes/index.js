const express = require('express');
const router = express.Router();
const { createToken, join, refreshToken, kakaoLogin } = require('../controllers/auth');
const userRouter = require('./user');
const passport = require('passport');
const todoEleRouter = require('./todo_element')
const todoListRouter = require('./todo_list')
const foodRouter = require('./food')
const exerciseRouter = require('./exercise')
const healthtipRouter = require('./health_tip')
const todoShareRouter = require('./share')
const categoryRouter = require('./category')


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

// /v1/todo_element
router.use('/todo_element', todoEleRouter)

// /v1/todo_list
router.use('/todo_list', todoListRouter)

// /v1/todo_list/share
router.use('/todo_list/share', todoShareRouter)

// /v1/category
router.use('/category', categoryRouter)

// /v1/food
router.use('/food', foodRouter)

// /v1/exercise
router.use('/exercise', exerciseRouter)

// /v1/tips
router.use('/health_tip', healthtipRouter)

module.exports = router;