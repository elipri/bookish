const express = require('express');
const router = express.Router();

//controllers
// @ts-ignore
const pingController = require('../controllers/pingController');
const booksController = require('../controllers/booksController');
const quotesController = require('../controllers/quotesController');
const ratingsController = require('../controllers/ratingsController');
const usersController = require('../controllers/usersController');
const authController = require('../controllers/authController');

const isLoggedIn = require('../middleware/isLoggedIn');

//routes:
//without token
//ping
router.get('/api/ping', pingController.ping);

//users
router.post('/api/users', usersController.create);
router.post('/api/login', authController.login);


router.use(isLoggedIn);

//with token
//users
router.get('/api/users', usersController.read);
router.get('/api/users/:id', usersController.readById);
router.put('/api/users', usersController.update);
router.delete('/api/users', usersController.delete);

//books
router.get('/api/books', booksController.read);
router.get('/api/books/:id', booksController.readid);
router.post('/api/books', booksController.post);
router.put('/api/books', booksController.put);
router.delete('/api/books', booksController.delete);

//ratings
router.get('/api/ratings', ratingsController.read);
router.post('/api/ratings', ratingsController.post);
router.put('/api/ratings', ratingsController.update);
router.delete('/api/ratings', ratingsController.delete);

//quotes
router.get('/api/quotes', quotesController.read);
router.post('/api/quotes', quotesController.post);
router.put('/api/quotes', quotesController.update);
router.delete('/api/quotes', quotesController.delete);
//app.get('/api/quotes/:b_id', quotesController);

module.exports = router;