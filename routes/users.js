var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('userinfo', {title: 'Baeknothing_portfolio'});
});

module.exports = router;
