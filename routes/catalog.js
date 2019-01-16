var express = require("express");
var router = express.Router();

var book_controller = require("../controllers/bookController");
var author_controller = require("../controllers/authorController");
var genre_controller = require("../controllers/genreController");
var book_instance_controller = require("../controllers/bookinstanceController");

router.get('/', book_controller.index);

router.get('/books', book_controller.book_list);

router.get('/book/:id', book_controller.book_detail);

router.get('/bookinstances', book_instance_controller.book_instance_list);

router.get('/bookinstance/:id', book_instance_controller.book_instance_detail);

router.get('/authors', author_controller.author_list);

router.get('/author/:id', author_controller.author_detail);

router.get('/genres', genre_controller.genre_list);

router.get('/genre/:id', genre_controller.genre_detail);

module.exports = router;