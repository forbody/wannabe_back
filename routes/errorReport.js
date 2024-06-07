const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middlewares');
const { postErr } = require('../controllers/error');

// [POST] /v1/error/ 오류사항작성 
router.post('/', postErr);

module.exports = router;
