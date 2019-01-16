var Book = require('../models/book');
var Author = require('../models/author');
var BookInstance = require('../models/bookinstance');
var Genre = require('../models/genre');

var async = require('async');

exports.author_list = (req, res, next) => {
    Author.find({})
        .sort([['family_name', 'ascending']])
        .exec(function(err, list) {
            if (err) return next(err);
            res.render('author_list', {title: "Author List", list: list});
        });
}

exports.author_detail = (req, res) => {
    async.parallel({
        author: function(callback) {
            Author.findById(req.params.id)
                .exec(callback);
        },
        author_books: function(callback) {
            Book.find({'author': req.params.id}, 'title summary')
                .exec(callback);
        }
    }, function(err, results) {
        if (err) return next(err);
        if (results.author == null) {
            var err = new Error("Author Not Found");
            var status = 404;
            return next(err);
        }
        res.render('author_detail', {title: "Author Detail", author: results.author, author_books: results.author_books});
    });
}

exports.author_create_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Author create get");
}

exports.author_create_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Author create post");
}

exports.author_delete_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Author delete get");
}

exports.author_delete_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Author delete post");
}

exports.author_update_get = (req, res) => {
    res.send("NOT IMPLEMENTED: Author update get");
}

exports.author_update_post = (req, res) => {
    res.send("NOT IMPLEMENTED: Author update post");
}