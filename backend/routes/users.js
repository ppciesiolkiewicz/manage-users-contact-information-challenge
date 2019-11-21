const express = require('express');
const router = express.Router();

const users = require('../model/users');


router.get('/:id', (req, res, next) => {
  const { params: { id } } = req;
  res.json(users.getById(id));
});

router.put('/', (req, res, next) => {
  const { body } = req;
  console.log(body)
  users.update(body);
  res.send(true);
});

module.exports = router;
