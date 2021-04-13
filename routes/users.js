const express = require('express');

const router = express.Router();

const userController = require('../controllers/users');

router.get('/allusers', userController.allUsers);

module.exports = router;
