const express = require('express');

const router = express.Router();

const bookController = require('../controllers/books');
const isAuth = require('../middleware/is-Auth');

router.post('/addbook', isAuth, bookController.postBooks);

router.get('/showbooks', isAuth, bookController.showBooks);

router.get('/showbooks/bookdetails/:bookId', isAuth, bookController.bookDetails);

router.get('/showbooks/bestbooks', isAuth, bookController.bestbook);

router.put('/showbooks/bookdetails/liked/:bookId',isAuth,bookController.liked);

module.exports = router;
