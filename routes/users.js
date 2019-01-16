var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/:userId/book/:bookId', (req, res) => {
  res.send(req.params);
});

module.exports = router;
