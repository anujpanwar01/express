const products = [];

exports.getAddProduct = (req, res, next) => {
  res.render('add-product', {
    path: '/admin/add-product',
    pageTitle: 'Add Product',
    activeProduct: true,
    formsCSS: true,
    productsCSS: true,
  });
  // res.sendFile(path.join(fileDir, 'views', 'add-product.html'));
};

exports.postNewProduct = (req, res) => {
  products.push({ title: req.body.title });
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  // res.sendFile('/views/shop.html'); give me error why because first / indicate the our operating system root folder not our project folder

  /**
   * __dirname -> routes directory here
   * ../ -> go to one level top or outside of the routes directory
   * views -> folder name
   * shop.html -> file name
   */
  // res.sendFile(path.join(fileDir, 'views', 'shop.html'));

  res.render('shop', {
    products,
    docTitle: 'Shop',
    pageTitle: 'My Shop',
    path: '/',
    hasProducts: products.length > 0,
    activeShop: true,
    productsCSS: true,
  });
};
