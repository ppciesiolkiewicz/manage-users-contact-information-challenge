const express = require('express');
const router = express.Router();

const users = require('../model/users');


router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
