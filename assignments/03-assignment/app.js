const express = require('express');
const app = express();
const bodyParser = require('body-parser');

const addUser = require('./routes/addUserRouter');
const showUser = require('./routes/showUserRouter');
const notFoundPage = require('./routes/404Router');

app.use(bodyParser.urlencoded({ extended: false }));

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(addUser);
app.use(showUser);
app.use(notFoundPage);

app.listen(3002);
