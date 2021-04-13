const express = require('express');

const router = express.Router();

const profileController = require('../controllers/profile');

const isAuth = require('../middleware/is-Auth');

// router.get('/profile');

router.get('/:userId', isAuth, profileController.showProfile);

router.put('/:userId', isAuth, profileController.updateProfile);

module.exports = router;
