var Book = require('../models/book');
var Author = require('../models/author');
var BookInstance = require('../models/bookinstance');
var Genre = require('../models/genre');

var async = require('async');

exports.index = (req, res) => {
    async.parallel({
        book_count: function(callback) {
            Book.countDocuments({}, callback);
        },
        book_instance_count: function(callback) {
            BookInstance.countDocuments({}, callback);
        },
        book_instance_available_count: function(callback) {
            BookInstance.countDocuments({status:'Available'}, callback);
        },
        author_count: function(callback) {
            Author.countDocuments({}, callback);
        },
        genre_count: function(callback) {
            Genre.countDocuments({}, callback);
        }
    }, function(err, results) {
        res.render('index', { title: "Local Library Home", error: err, data: results });
    });
};

exports.book_list = (req, res, next) => {
    Book.find({}, 'title author')
        .populate('author')
        .exec(function(err, list) {
            if (err) return next(err);
            res.render('book_list', {title: "Book List", list: list});
        });
};

exports.book_detail = (req, res, next) => {
    async.parallel({
        book: function(callback) {
            Book.findById(req.params.id)
                .populate('author')
                .populate('genre')
                .exec(callback);
        },
        book_instance: function(callback) {
            BookInstance.find({'book': req.params.id})
                .exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.book == null) {
            var err = new Error("Book Not Found");
            var status = 404;
            return next(err);
        }
        res.render('book_detail', {title: "Book Detail", book: results.book, book_instances: results.book_instance});
    })
}