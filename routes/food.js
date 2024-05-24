const express = require('express');
const router = express.Router();
const { uploadFood , watercount, getDishes, getDish, getRandomDishes, getTodayDishes } = require('../controllers/food');
const { verifyToken } = require('../middlewares');


// v1/food/ - 음식 더미데이터 생성
router.get('/', uploadFood)

// v1/food/sort/:sort - 음식들 가져오기
router.get('/sort/:sort', verifyToken, getDishes)

// v1/food/:id - 특정 음식 가져오기
router.get('/:id', verifyToken, getDish)

// v1/food/random-dish - 랜덤 음식 5개 가져오기
router.get('/random-dish', verifyToken, getRandomDishes);

// v1/food/today-dish - 랜덤 음식 5개 가져와서 아점저 중에 골라 todo_element에 집어넣기
router.post('/today-dish', verifyToken, getTodayDishes);

module.exports = router;
