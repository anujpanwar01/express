const express = require('express');
const path = require('path');

const fileDir = require('../helper/path');
const router = express.Router();

router.get('/add-product', (req, res, next) => {
  res.sendFile(path.join(fileDir, 'views', 'add-product.html'));
});

router.post('/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

module.exports = router;
