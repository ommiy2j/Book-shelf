const Users = require('../model/user');

exports.allUsers = (req, res, next) => {
	Users.find()
		.then((users) => {
            return res.status(400).json({
                'messege': 'users Fetched',
                users: users
            })
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};
