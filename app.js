const express = require('express');
const bodyParser = require('body-parser');

const adminRouter = require('./Routers/admin');
const shopRouter = require('./Routers/shop');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.use(adminRouter);
app.use(shopRouter);

// 404 page
app.use((req, res, next) => {
  res.status(404).send('<h4>Page not found</h4>');
});
// app.use(bodyParser.urlencoded({ extended: false })); // it's automatically called the next() function

app.listen(3000);

/*
app.use((req, res, next) => {
  // next is a function which is called to the next middleware function
  console.log('middleware 1');
  next();
});
//TODO: if we don't use the next function in previous middleware it will not go to the next middleware

app.use((req, res, next) => {
  console.log('middleware 2'); // at this time we are exiting the code to that in express we can call res.send();
  res.send('<h3>Hello</h3>'); // so if we call the next middleware after this it'll not work getting error in console
});

app.listen(3000);

*/
