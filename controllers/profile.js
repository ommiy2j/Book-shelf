const User = require('../model/user');
const mongodb = require('mongodb');

exports.showProfile = (req, res, next) => {
	// const name = req.body.name;
	let fullName;
	const userId = req.params.userId;
	console.log(userId);
	User.findById(userId)
		.then((user) => {
			// console.log(user.fname);
			fullName = user.profile.fname + ' ' + user.profile.lname;
			return res.json({
				messege: 'profile showed successfully',
				fname: user.profile.fname,
				lname: user.profile.lname,
				name:fullName,
				image: user.profile.image,
				location: user.profile.location,
				social: user.profile.social,
				skills:user.profile.skills
			});
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};

exports.updateProfile = (req, res, next) => {
	const userId = req.params.userId;
	const fname = req.body.fname;
	const lname = req.body.lname;
	const country = req.body.country;
	const state = req.body.state;
	const fbUrl = req.body.fbUrl;
	const linkdinUrl = req.body.linkdinUrl;
	const githubUrl = req.body.githubUrl;
	let skills = req.body.skills;
	skills = skills.split(',');
	console.log(skills)
	let image;
	if (req.file) {
		image = req.file.path;
		image = '/' + req.file.path.replace('\\', '/');
	}
	console.log(fbUrl);

	User.findById(userId)
		.then((user) => {
			if (!user) {
				return res.json({ messege: 'User doesnot Exists' });
			}
			user.profile.fname = fname;
			user.profile.lname = lname;
			user.profile.location.country = country;
			user.profile.location.state = state;
			user.profile.social.facebook = fbUrl;
			user.profile.social.linkdin = linkdinUrl;
			user.profile.social.github = githubUrl;
			// console.log(user.profile.skills);
			if (skills.length) {
				skills.map((skill) => {
					if (!user.profile.skills.includes(skill)) {
						user.profile.skills.push(skill);	
					}
				});
			}
			// user.profile.skills = skills;
			if (image) {
				user.profile.image = image;
			}
			return user.save();
		})
		.then((result) => {
			return res.status(200).json({'messege': 'Successfully Edited'})
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
	// console.log(userId, fname, lname, image);
};



