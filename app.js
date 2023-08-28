const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); // it's automatically called the next() function

app.use('/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" type="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

app.use('/product', (req, res) => {
  console.log(req.body);
  //   res.end()
  res.redirect('/');
});

// if no route match it'll go into the home route middleware
app.use('/', (req, res, next) => {
  res.send('<h3>Welcome home!</h3>');
});

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
