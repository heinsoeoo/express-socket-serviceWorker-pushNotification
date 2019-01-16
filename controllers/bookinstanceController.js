var Book = require('../models/book');
var Author = require('../models/author');
var BookInstance = require('../models/bookinstance');
var Genre = require('../models/genre');

var async = require('async');

exports.book_instance_list = (req, res, next) => {
    BookInstance.find()
        .populate('book')
        .exec(function(err, list) {
            if (err) return next(err);
            res.render('bookinstance_list', {title: "Book Instance List", list: list})
        });
};

exports.book_instance_detail = (req, res, next) => { 
    BookInstance.findById(req.params.id)
        .populate('book')
        .exec(function(err, result){
            if (err) return next(err);
            res.render('bookinstance_detail', {title: "Book Instance Detail", book_instance: result});
        });
}