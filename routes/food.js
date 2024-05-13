const express = require('express');
const { uploadFood } = require('../controllers/food');
const router = express.Router();
const { Category, Food } = require('../models');

router.get('/', uploadFood)

module.exports = router;