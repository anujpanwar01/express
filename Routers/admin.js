const express = require('express');
const path = require('path');

const fileDir = require('../helper/path');
const router = express.Router();

const products = [];

router.get('/add-product', (req, res, next) => {
  res.render('add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
  });
  // res.sendFile(path.join(fileDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
});

exports.routes = router;
exports.products = products;
