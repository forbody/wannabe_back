const express = require('express');
const router = express.Router();
const exerciseRouter = require('./exercise');

// POST /v1/auth/join
// router.post('/auth/join', ____);

// router.메서드('경로', 컨트롤러함수); // 하나 기능
router.use('/exercise', exerciseRouter)

module.exports = router;