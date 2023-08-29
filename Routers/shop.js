const express = require('express');

const router = express.Router();

// if we use get instead of of use it will match the exact path
router.get(
  // if no route match it'll go into the home route middleware
  '/',
  (req, res, next) => {
    res.send('<h3>Welcome home!</h3>');
  }
);

module.exports = router;
