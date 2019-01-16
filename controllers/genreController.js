var Book = require('../models/book');
var Author = require('../models/author');
var BookInstance = require('../models/bookinstance');
var Genre = require('../models/genre');
var async = require('async');

exports.genre_list = (req, res, next) => {
    Genre.find()
        .sort([['name','ascending']])
        .exec(function(err, list) {
            if (err) return next(err);
            res.render('genre_list', {title: "Genre List", list: list});
        });
}

exports.genre_detail = (req, res, next) => {
    async.parallel({
        genre: function(callback) {
            Genre.findById(req.params.id)
                .exec(callback);
        },
        genre_books: function(callback) {
            Book.find({'genre': req.params.id})
                .exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.genre==null) {
            var err = new Error("Genre not found");
            err.status = 404;
            return next(err);
        }
        res.render('genre_detail', {title: "Genre Detail", genre: results.genre, genre_books: results.genre_books});
    });
}