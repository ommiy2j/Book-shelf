const express = require('express');
const { check, body } = require('express-validator/check');
const router = express.Router();
const User = require('../model/user');

const authController = require('../controllers/auth');

router.put(
	'/signup',
	[
		body('fname', 'Enter Correct Name').trim().isAlpha().isLength({ min: 3, max: 15 }),
		body('lname', 'Enter Correct Name').trim().isAlpha().isLength({ min: 0, max: 15 }),
		body('email')
			.isEmail()
			.withMessage('Please enter a valid email.')
			.custom((value, { req }) => {
				return User.findOne({ email: value }).then((userDoc) => {
					if (userDoc) {
						return Promise.reject('E-Mail address already exists!');
					}
				});
			})
			.normalizeEmail(),
		body('password').trim().isLength({ min: 5 })
	],
	authController.getSignUp
);

router.post(
	'/login',
	[
		body('email', 'Enter Valid Email').trim().isEmail().normalizeEmail(),
		body('password', 'Enter Correct Password').trim().isLength({ min: 6 })
	],
	authController.postLogin
);


router.post('/googlelogin',authController.googlelogin)
module.exports = router;
