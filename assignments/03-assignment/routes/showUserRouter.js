const express = require('express');

const router = express.Router();

const users = [];
router.post('/users', (req, res) => {
  users.push({ name: req.body.name });
  res.render('users', { users, pageTitle: 'My Users' });
});

module.exports = router;
