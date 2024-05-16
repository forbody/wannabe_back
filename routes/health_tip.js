const express = require('express');
const router = express.Router();
const { getTips } = require('../controllers/health_tip')

// /v1/tips/
router.get('/', getTips)

module.exports = router;