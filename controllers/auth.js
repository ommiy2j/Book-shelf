const { validationResult } = require('express-validator/check');
const bcrypt = require('bcrypt');
const User = require('../model/user');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const config = require('config');

const client = new OAuth2Client(config.get('google_client_id'));

exports.getSignUp = (req, res, next) => {
	const errors = validationResult(req);
	console.log(errors);
	if (!errors.isEmpty()) {
		const error = new Error('Validation Failed');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}
	const fname = req.body.fname;
	const lname = req.body.lname;
	const email = req.body.email;
	const password = req.body.password;
	const confirmPassword = req.body.confirmPassword;
	if (password !== confirmPassword) {
		const error = new Error('Password Do not Matches!');
		error.statusCode = 422;
		throw error;
	}
	bcrypt
		.hash(password, 12)
		.then((hashedPass) => {
			const user = new User({
				email: email,
				password: hashedPass,
				profile: {
					fname: fname,
					lname: lname
				},
				fav: [],
				books: []
			});
			return user.save();
		})
		.then((result) => {
			res.status(400).json({ messege: 'User Created' });
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};

exports.postLogin = (req, res, next) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		const error = new Error('Validation Failed');
		error.statusCode = 422;
		error.data = errors.array();
		throw error;
	}
	const email = req.body.email;
	const password = req.body.password;
	let loadedUser;
	console.log(email);
	User.findOne({ email: email })
		.then((user) => {
			loadedUser = user;
			return bcrypt.compare(password, user.password);
		})
		.then((equal) => {
			if (!equal) {
				const error = new Error('Please Enter a Valid Password');
				error.statusCode = 422;
				throw error;
			}
			const token = jwt.sign(
				{
					email: loadedUser.email,
					userId: loadedUser._id.toString()
				},
				config.get('JWT_SECRET_TOKEN'),
				{
					expiresIn: '1h'
				}
			);

			res.status(200).json({
				token: token,
				userId: loadedUser._id.toString(),
				name: loadedUser.profile.fname,
				userId: loadedUser._id
			});
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};

exports.googlelogin = (req, res, next) => {
	const { token } = req.body;
	// console.log(token);
	client
		.verifyIdToken({
			idToken: token,
			audience: config.get('google_client_id')
		})
		.then((response) => {
			const { name, email, picture, email_verified, jti } = response.payload;
			if (email_verified) {
				User.findOne({ email })
					.then((user) => {
						let loadedUser = user;

						if (user) {
							const token = jwt.sign(
								{
									email: loadedUser.email,
									userId: loadedUser._id.toString()
								},
								config.get('JWT_SECRET_TOKEN'),
								{
									expiresIn: '1h'
								}
							);
							res.status(200).json({
								token: token,
								userId: loadedUser._id.toString(),
								name: loadedUser.profile.fname,
								userId: loadedUser._id
							});
						} else {
							let password = email + jti;
							bcrypt
								.hash(password, 12)
								.then((hashedPass) => {
									const newUser = new User({
										email: email,
										password: hashedPass,
										profile: {
											fname: name,
											lname: '',
											image: picture
										}
									});
									return newUser.save();
								})
								.then((result) => {
									return res.json({
										messege: 'Logged In successful'
									});
								});
						}
					})
					.catch((err) => {
						const error = new Error('Something Went wrong....');
						error.statusCode = 500;
						next(error);
					});
			}
		});
};
