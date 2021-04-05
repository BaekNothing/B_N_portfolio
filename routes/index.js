var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Baeknothing_portfolio' });
});

router.post('/name', function(req, res, next) {
  var dirSrc = './public/resource/' + req.body.name;
  var imgcount = 0;
  var movcount = 0;
  var movurllist = 0;
  var unitycount = 0;
  var unityurllist = 0;

  fs.readdir(dirSrc+'/img', function(error, imglist){
    imgcount = imglist.length;
    fs.readdir(dirSrc+'/mov', function(error, movlist){
      movcount = movlist.length;
      //length랑 list의 갯수가 안맍는 문제가 있음 >2개부터 error
      try{
        movurllist = fs.readFileSync(dirSrc+'/mov/list.txt', 'utf-8').split('\n');
        console.log(movurllist);
      }catch(error){ console.log('mov not exit'); }
      fs.readdir(dirSrc+'/unity', function(error, unitylist){
        unitycount = unitylist.length;
        res.render('contents', {
            content_title: req.body.name,
            content_subtitle: 'subtitle',
            content_imgs: imgcount,
            content_movs: movcount,
            content_movurls : movurllist,
            content_unitys: unitycount,
            content_dates: '2021.04.05.Mon',
            content_texts: 'texts'
        });
      });
    });
  });
});

module.exports = router;
