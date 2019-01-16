var express = require('express');
var router = express.Router();
var auth_controller = require('../controllers/authController');
var user_controller = require('../controllers/userController');

/* GET home page. */
router.get('/', function(req, res) {
  res.redirect('/catalog');
});

router.get('/profile', user_controller.profile);

router.post('/register', auth_controller.register);

router.post('/login', auth_controller.login);

router.get('/logout', auth_controller.logout);

module.exports = router;
