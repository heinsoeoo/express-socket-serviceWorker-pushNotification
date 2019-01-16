var User = require('../models/user');

exports.profile = (req, res, next) => {
    if (req.session.user){
        User.findById(req.session.user._id)
            .exec((err, user) => {
                if (err) return next(err);
                if (!user){
                    res.redirect('/');
                }
                res.render('profile');
            });
    }else res.redirect('/');
}