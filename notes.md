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

*If there is no route match it'll go to the home route(/) by default*