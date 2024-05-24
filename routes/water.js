const express = require('express');
const router = express.Router();
const { getWater, createWater, updateWater } = require('../controllers/water');
const { verifyToken } = require('../middlewares');


// v1/water/:id  - 수분 섭취량 조회
router.get('/:id', verifyToken, getWater)

// v1/water/  - 수분 섭취 시작
router.post('/', verifyToken, createWater)

// v1/water/  - 수분 섭취 업데이트
router.patch('/', verifyToken, updateWater)

module.exports = router;