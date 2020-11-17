//@ts-check
const express = require("express");
//const { title } = require("process");
//const { runInNewContext } = require("vm");
const app = express();

const config =  require('./config');
const port =  config.port;

//controllers
// @ts-ignore
const pingController = require('./api/controllers/pingController');
const booksController = require('./api/controllers/booksController');
const quotesController = require('./api/controllers/quotesController');
const ratingsController = require('./api/controllers/ratingsController');
const usersController = require('./api/controllers/usersController');
const authController = require('./api/controllers/authController');

//my middleware
const logging = require('./api/middleware/logging');
const isLoggedIn = require('./api/middleware/isLoggedIn');

app.use(logging); //ükskõik kuhu, kasuta logging

//middleware for json
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//routes:
//without token
//ping
app.get('/api/ping', pingController.ping);

//users
app.post('/api/users', usersController.create);
app.post('/api/login', authController.login);

app.use(isLoggedIn);

//with token
//users
app.get('/api/users', usersController.read);
app.get('/api/users/:id', usersController.readById);
app.put('/api/users', usersController.update);
app.delete('/api/users', usersController.delete);

//books
app.get('/api/books', booksController.read);
app.get('/api/books/:id', booksController.readid);
app.post('/api/books', booksController.post);
app.put('/api/books', booksController.put);
app.delete('/api/books', booksController.delete);

//ratings
app.get('/api/ratings', ratingsController.read);

//quotes
app.get('/api/quotes', quotesController.read);
//app.get('/api/quotes/:b_id', quotesController);

//start server
app.listen(port, () => {
  console.log("Server's running, yay.");
});
