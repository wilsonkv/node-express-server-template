const express = require('express');
const router = express.Router();

router.get('/', function(req, res, next) {
  res.send({ title: 'mock-project-server' });
});

module.exports = router;
