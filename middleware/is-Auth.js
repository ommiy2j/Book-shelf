const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
	const authHeader = req.get('Authorization');
	// console.log(authHeader);
	if (!authHeader) {
		const error = new Error('Not Authenticated');
		error.statusCode = 401;
		throw error;
	}
	const token = authHeader.replace('Bearer', '');
	// console.log(token);
	let decodedToken;
	try {
		decodedToken = jwt.verify(token, 'qwertyuioplkjhgfdsa');
	} catch (err) {
		const error = new Error('Not Authenticated');
		error.statusCode = 401;
		throw error;
	}
	// console.log(decodedToken);
    req.userId = decodedToken.userId;
    next();
};
// 