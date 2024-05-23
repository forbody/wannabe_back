const express = require('express');
const router = express.Router();
const { uploadFood , watercount, getDishes, getDish, getRandomDishes } = require('../controllers/food');
const { verifyToken } = require('../middlewares');


// v1/food/
router.get('/', uploadFood)

// v1/food/watercount
// router.get('/watercount', watercount);

// v1/food/sort/:sort
router.get('/sort/:sort', verifyToken, getDishes)

router.get('/random-dish', verifyToken, getRandomDishes);
// v1/food/:id
router.get('/:id', verifyToken, getDish)

module.exports = router;
