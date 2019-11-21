const express = require('express');
const router = express.Router();

const users = require('../model/users');


router.get('/:id', (req, res, next) => {
  const { id } = req.params;
  res.json(users.getById(id));
});

router.put('/', (req, res, next) => {
  res.send('respond with a resource');
});

module.exports = router;
