# How express work in the under the hood.

![how express work in top level](https://miro.medium.com/v2/resize:fit:1400/1*ptNjzuT0m2BQ9YpQTVwVLg.png)

### Express using the top to bottom approach for the middleware

```
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
```

---

### Handling routes in the middleware

order is matching here for incoming requests like we use the home route("/") first it's never going to the next middleware until unless we are not calling the next function.

```
<!-- use function have first parameter is path like -> / or /users etc. -->

<!-- even if request url is /users it's always use the the first middleware and return the response from there. -->

app.use("/", (req, res, next) => {
 res.send("<h1>hello</h1>")
});

app.use("/users", (req, res, next) => {
 res.send("<h1>hello users</h1>")
});

```

**To prevent from this we need to call the home route at the end**

```
<!-- now it will work fine  -->
app.use("/users", (req, res, next) => {
 res.send("<h1>hello users</h1>")
});

app.use("/", (req, res, next) => {
 res.send("<h1>hello</h1>")
});
```

_If there is no route match it'll go to the home route(/) by default_

---

### How to get the body or actual data from the request

```
app.use('/product', (req, res) => {
  console.log(req.body); // giving me undefined here

  // this is because we are not parsing the body so we need to add the third party middle ware called -- body-parser --

  // and body-parser should call before we handling routes

  res.redirect('/');
});
```

---

### Express provide the Router function to us and it's easy to use

```
const express = require('express');

const router = express.Router();

// it will match the exact path
router.get('/', function(req, res){
  res.send("<h1>hello</h1>")
})
module.exports = router;
```

**Note -> get,post or other method will match the exact path like we shown in previous example if i use the 'use' function it will take all request but now it'll only take care of home route**

---

### Handling unhandled routing like if not match anything just return 404 page

```
// by default use have home("/") path always and use method take tare of methods like "GET" or "POST" etc.
app.use((req, res, next) => {
  res.status(404).send('<h4>Page not found</h4>');
});
```

---

<button style="color:#FFEEF4; background:#9D44C0; padding:10px;border-radius:5px; border:none">Improvement</button>

### If routes have matching some routes parts ->

```
router.get('/admin/add-product', (req, res, next) => {
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
  );
});

router.post('/admin/product', (req, res) => {
  console.log(req.body);
  res.redirect('/');
});

```

we can clearly see here <span style="color: #7147ed">**/admin**</span> is matching from the start in both router or middleware.

### Fix for this

we just need to add the matching path in app.js where is entry point of the router.

```
// app.js
app.use("/admin", adminRoute)


// admin route file

// url will be `/admin/add-products`
app.get("/add-products",(req, res, next) =>{
  res.send(
    '<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>'
    )
})

```

---

### How to send the html file back to the client where they can visible the html page

<p>I added the absolute path like this "/views" but it's giving me error because it's referring the operating system file path not the project directory</p>

```
router.get('/', (req, res, next) => {
  res.sendFile('/views/shop.html');
});

```

<h3>Solution</h3>

```
const path = require('path');

/**
* __dirname -> where the file actually exists like in this case routes folder
* (.. or ../) -> Go to the one up level where the html file
* views -> directory of file which we want
* shop.html -> actual file
*/

router.get('/', (req, res, next) => {
  res.sendFile(path.join(__dirname, '..' 'views', 'shop.html'));
});
```

<button style="background:#fafafa; color:black; border:none; padding:10px; border-radius:5px">Better approach to handle this directory name</button>

<p>basically we can extract this '..' path using the path library helper function </p>

<h4>helper/path.js</h4>

```
const path = require('path');

/**
 * deprecated -> module.exports = path.dirname(process.mainModule.filename);
 * (mainModule | main) -> app.js entry point of the application
 * (filename) -> current file import or using
 */
module.exports = path.dirname(require.main.filename);

```

<h4>routes/shop.js</h4>

```
const express = require('express');
const path = require('path');

const fileDir = require('./../helper/path');
const router = express.Router();

router.get('/', (req, res, next) => {
  res.sendFile(path.join(fileDir, 'views', 'shop.html'));
});
```

---

### Showing the dynamic content in client side html page

<p>So for that we need to use html template engines which will be useful in reproduce the dynamic content </p>

<h4>There are the three most popular engines -:</h4>

- Pug
- Ejs
- Handlebars

### Injecting the template engine into the express

<p>So for that we can use the method provided by express -></p>

```
app.set('view engine', 'pug');

app.set('views', 'template');
```

<p>template will be a folder where the pug files are stored.</p>

<h4>Pug</h4>

one example

```
doctype html
html(lang="en")
    head
        meta(charset="UTF-8")
        meta(http-equiv="X-UA-Compatible" content="IE=edge")
        meta(name="viewport" content="width=device-width, initial-scale=1.0")
        title #{docTitle}
        link(rel="stylesheet" href="/css/main.css")
        link(rel="stylesheet" href="/css/product.css")
    body
        header.main-header
            nav.main-header__nav
                ul.main-header__item-list
                    li.main-header__item
                        a.active(href="/") Shop
                    li.main-header__item
                        a(href="/admin/add-product") Add product
        main
            if products.length > 0
                .grid
                    each product in products
                        article.card.product-item
                            header.card__header
                                h1.product__title #{product.title}
                            div.card__image
                                img(src="https://cdn.pixabay.com/photo/2016/03/31/20/51/book-1296045_960_720.png" alt="A Book")
                            div.card__content
                                h2.product__price $19.90
                                p.product__description A very interesting book about so many even more interesting things!
                            .card__actions
                                button.btn Add to cart
            else
                h1 no products

```

### sending the html file to the client in pug

```
const router = express.Router();

router.get('/', function(req, res) {
res.render('shop', {data: products, docTitle: 'Shop'}) // don't need to add the shop.pug here because we already defined the engine name
});
```
