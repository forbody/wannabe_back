const express = require('express');
const { uploadFood , watercount} = require('../controllers/food');
const { Category, Food } = require('../models');
const router = express.Router();


// v1/food/
router.get('/', uploadFood)

// v1/food/watercount
router.get('/watercount', watercount);

module.exports = router;
