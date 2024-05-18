const express = require('express');
const { get_category } = require('../controllers/category');
const router = express.Router();


// v1/category/:id
router.get('/:id', get_category)

module.exports = router;
