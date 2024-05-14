const express = require('express');
const { uploadFood } = require('../controllers/food');
const router = express.Router();


router.get('/', uploadFood)

module.exports = router;