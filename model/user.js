const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = Schema(
	{
		profile: {
			fname: {
				type: String,
				required: true
			},
			lname: {
				type: String
			},
			social: {
				facebook: {
					type: String
				},
				linkdin: {
					type: String
				},
				github: {
					type: String
				}
			},
			skills: {
				type: Array
			},
			image: {
				type: String
			},
			location: {
				country: String,
				state: String
			}
		},
		email: {
			type: String,
			required: true
		},
		password: {
			type: String,
			required: true
		},
		fav: {
			type: Array
		},
		books: {
			type: Array
		}
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
