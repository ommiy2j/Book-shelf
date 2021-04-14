const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const authRoute = require('./routes/auth');
const bookRoute = require('./routes/books');
const profileRoute = require('./routes/profile');
const userController = require('./routes/users');
const multer = require('multer');
const path = require('path');
const config = require('config');
const helmet = require('helmet');
const compression = require('compression');

//MongoDb URI
const MONGODB_URI = config.get('MONGO_DB_URI');

app.use((req, res, next) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
	next();
});

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, 'images');
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const fileFilter = (req, file, cb) => {
	if (
		file.mimetype == 'image/jpg' ||
		file.mimetype == 'image/png' ||
		file.mimetype == 'image/jpeg' ||
		file.mimetype == 'image/wbep'
	) {
		cb(null, true);
	} else {
		cb(null, false);
	}
};

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(multer({ fileFilter: fileFilter, storage: storage }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/book', bookRoute);
app.use('/auth', authRoute);
app.use('/profile', profileRoute);
app.use('/users', userController);

app.use(compression());

app.use((err, req, res, next) => {
	const status = err.statusCode || 500;
	const messege = err.messege || 'Server Error!';
	const data = err.data;
	res.status(status).json({
		messege: messege,
		data: data
	});
});

if (process.env.NODE_ENV == 'production') {
	app.use(express.static('book-directory/build'));
	app.get('*', (req, res) => {
		res.sendFile(path.resolve(__dirname, 'book-directory', 'build', 'index.html'));
	});
}

const port = process.env.PORT || 8080;

mongoose
	.connect(MONGODB_URI)
	.then((result) => {
		app.listen(port);
	})
	.catch((err) => {});
