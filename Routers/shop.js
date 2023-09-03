const express = require('express');

// const fileDir = require('./../helper/path');
const router = express.Router();
const productController = require('../controllers/product');

// if we use get instead of of use it will match the exact path
// if no route match it'll go into the home route middleware
router.get('/', productController.getProducts);
module.exports = router;
