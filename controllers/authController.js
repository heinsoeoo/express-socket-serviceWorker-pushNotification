const User = require('../models/user');
const bcrypt = require('bcrypt');
const salt = 10;

exports.register = (req, res, next) => {
    if (req.body.username && req.body.password && req.body.confPassword) {
        let validate = pwdConfCheck(req.body.password, req.body.confPassword);
        if (validate){
            let user_detail = {
                username: req.body.username,
                password: req.body.password
            }
            bcrypt.hash(user_detail.password, salt, (err, hash) => {
                if (err) return next(err);
                user_detail.password = hash;
                let user = new User(user_detail);
                user.save((err) => {
                    if (err) return next(err);
                    req.session.user = user;
                    res.redirect('/');
                })
            })
        }else{
            res.redirect('/');
        }
    }else{
        res.redirect('/');
    }
}

function pwdConfCheck(pwd, con) {
    return pwd == con? true : false;
}

exports.logout = (req, res, next) => {
    if (req.session.user){
        req.session.destroy((err) => {
            if (err) return next(err);
            res.redirect('/');
        });
    }
}

exports.login = (req, res, next) => {
    if (req.body.username && req.body.password){
        User.findOne({username: req.body.username})
            .exec((err, user) => {
                if (err) return next(err);
                if (!user) {
                    var error = new Error('User Not Found');
                    error.status = 401;
                    return next(error);
                }
                bcrypt.compare(req.body.password, user.password, (err, result) => {
                    if (result === true) {
                        req.session.user = user;
                        res.redirect('/');
                    }else{
                        return next(err);
                    }
                })
            });
    }else{
        res.redirect('/');
    }
}