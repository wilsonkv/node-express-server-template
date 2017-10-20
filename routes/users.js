const express = require('express');
const router = express.Router();

const usersController = require('../controllers/usersController');
const verifyLoggedInUser = require('../lib/verifyLoggedInUser');

router.post('/', usersController.create);

router.use(verifyLoggedInUser);

router.get('/', usersController.index);

router.get('/me', usersController.show);

module.exports = router;
