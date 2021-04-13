const Book = require('../model/book');
const User = require('../model/user');

exports.postBooks = (req, res, next) => {
	if (!req.file) {
		console.log('No Image Provided');
		const error = new Error('Image Not Added!');
		error.statusCode = 422;
		throw error;
	}
	const bookName = req.body.name;
	let image = req.file.path;
	const details = req.body.details;
	const author = req.body.author;
	const userId = req.body.userId;

	image = '/' + req.file.path.replace('\\', '/');

	const book = new Book({
		name: bookName,
		image: image,
		details: details,
		author: author,
		creator: userId
	});
	book
		.save()
		.then((result) => {
			return User.findById(req.userId);
		})
		.then((user) => {
			creator = user;
			user.books.push(book);
			return user.save();
		})
		.then((result) => {
			res.status(200).json({
				messege: 'Book Added Successfully'
			});
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};

exports.showBooks = (req, res, next) => {
	const currentPage = req.query.page || 1;
	const perPage = 6;
	let total = 0;
	Book.find()
		.countDocuments()
		.then((count) => {
			total = count;
			return Book.find().skip((currentPage - 1) * perPage).limit(perPage);
		})
		.then((result) => {
			res.status(200).json({
				book: result,
				messege: 'Books Fetched Successfully',
				total: Math.ceil(total / perPage)
			});
		})
		.catch((err) => {
			if (!err.statusCode) {
				err.statusCode = 422;
			}
			next(err);
		});
};

exports.bookDetails = (req, res, next) => {
	const bookId = req.params.bookId;
	Book.findById(bookId)
		.then((book) => {
			return res.json({
				messege: 'book fetched',
				book: book
			});
		})
		.catch((err) => {
			const error = new Error('Book Fething Failed');
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
	
};

exports.bestbook = (req, res, next) => {
	Book.find({ rating: { $gt: 2 } })
		.then((result) => {
			res.status(400).json({
				book: result,
				messege: 'book Fetched'
			});
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};

exports.liked = (req, res, next) => {
	const bookId = req.params.bookId;
	const likecount = req.body.likecount;
	let rating;
	Book.findById(bookId)
		.then((book) => {
			if (!book.rating) {
				book.rating=0
			}
			if (book.rating === 0) {
				rating = 1;
			} else {
				rating = book.rating;
			}
		})
		.then((result) => {
			return Book.findByIdAndUpdate(bookId, { rating: rating + likecount });
		})
		.then((result) => {
			return res.json({
				messege: 'liked added',
				totallike: result.rating
			});
		})
		.catch((error) => {
			if (!error.statusCode) {
				error.statusCode = 422;
			}
			next(error);
		});
};
