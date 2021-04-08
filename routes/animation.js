var express = require('express');
var router = express.Router();
var fs = require('fs');

router.post('/', function(req, res, next) {
  var dirSrc = './views/animations';
  console.log(dirSrc);

  try{
    fs.readdir(dirSrc, function(error, list){
      var count = Math.floor(Math.random() * list.length);
          res.render('animations/ani' + count, { content_title: 'animations' });
      });
  }catch(error){ console.log('notend'); }
});

module.exports = router;
