const express = require('express');
const path = require('path');

const fileDir = require('./../helper/path');
const router = express.Router();
const adminData = require('./admin');

// if we use get instead of of use it will match the exact path
// if no route match it'll go into the home route middleware
router.get('/', (req, res, next) => {
  // res.sendFile('/views/shop.html'); give me error why because first / indicate the our operating system root folder not our project folder

  /**
   * __dirname -> routes directory here
   * ../ -> go to one level top or outside of the routes directory
   * views -> folder name
   * shop.html -> file name
   */
  // res.sendFile(path.join(fileDir, 'views', 'shop.html'));

  const products = adminData.products;
  res.render('shop', {
    products,
    docTitle: 'Shop',
    pageTitle: 'My Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true,
  });
});

module.exports = router;
