const mongoose = require('mongoose');
const user = require('./user');

const Schema = mongoose.Schema;

const bookSchema = Schema(
	{
		name: {
			type: String,
			required: true
		},
		image: {
			type: String
		},
		details: {
			type: String,
			required: true
		},
		author: {
			type: String,
			required: true
		},
		creator: {
			ref: user,
			type: String
		},
		rating: {
			type: Number
		}
	},
	{ timeStamp: true }
);

module.exports = mongoose.model('Books', bookSchema);
