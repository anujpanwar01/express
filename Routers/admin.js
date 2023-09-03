const express = require('express');
const router = express.Router();

// const fileDir = require('../helper/path');
const productController = require('../controllers/product');

const products = [];

router.get('/add-product', productController.getAddProduct);

router.post('/product', productController.postNewProduct);

module.exports = router;
