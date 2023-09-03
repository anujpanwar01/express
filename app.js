const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const adminRoute = require('./Routers/admin');
const shopRouter = require('./Routers/shop');

const app = express();

app.set('view engine', 'ejs'); // same name as we defined in engine

// app.set('view engine', 'pug');
//app.set('views', 'views'); first views is default by express and second views is for our template files
app.set('views', 'views');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public'))); // for static files like css
// app.use('/admin', adminRouter); // adding the common routes for the adminRouter like -> /admin/add-product
app.use('/admin', adminRoute);
app.use(shopRouter);

// 404 page
app.use((req, res, next) => {
  // res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
  res.status(404).render('404', { pageTitle: 'Page not found', path: '' });
});

app.listen(3000);
// app.use(bodyParser.urlencoded({ extended: false })); // it's automatically called the next() function

/*
app.use((req, res, next) => {
   next is a function which is called to the next middleware function
  console.log('middleware 1');
  next();
});
TODO: if we don't use the next function in previous middleware it will not go to the next middleware

app.use((req, res, next) => {
  console.log('middleware 2'); // at this time we are exiting the code to that in express we can call res.send();
  res.send('<h3>Hello</h3>'); // so if we call the next middleware after this it'll not work getting error in console
});

app.listen(3000);

*/

// app.engine(
//   'hbs',
//   expressHandleBar({
//     layoutDir: 'views/layouts',
//     defaultLayout: 'main-layout.hbs',
//     extname: 'hbs',
//   })
// ); // initialize the expressHandleBar
