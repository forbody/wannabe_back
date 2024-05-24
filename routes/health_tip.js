const express = require('express');
const router = express.Router();
const { getTip, dummyTip } = require('../controllers/health_tip')

// /v1/health_tip/
router.get('/', getTip);

// /v1/health_tip/dummy 더미데이터 생성
router.get('/dummy', dummyTip);

module.exports = router;