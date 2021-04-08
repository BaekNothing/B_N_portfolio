var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/', function(req, res, next) {
  var dirSrc = './public/resource/';
  try{
  fs.readdir(dirSrc + 'unity', function(error, unitylist){
    console.log(unitylist);
    fs.readdir(dirSrc + 'design', function(error,designlist){
      console.log(designlist);
      fs.readdir(dirSrc + 'web', function(error,weblist){
        console.log(weblist);
        res.render('index', {
          title: 'Baeknothing_portfolio',
          unitycount: unitylist.length,
          unitylist: unitylist,

          designcount: designlist.length,
          designlist: designlist,

          webcount: weblist.length,
          weblist: weblist
        });
      });
    });
  });}catch(error){console.log(error);}
});


router.post('/name', function(req, res, next) {
  var dirSrc = './public/resource/'+ req.body.category + '/' + req.body.name;
  console.log(dirSrc);
  var imgcount = 0;
  var movcount = 0;
  var movurllist = 0;
  var unitycount = 0;
  var unityurllist = 0;

  try{
  fs.readdir(dirSrc+'/img', function(error, imglist){
    imgcount = imglist.length;
    fs.readdir(dirSrc+'/mov', function(error, movlist){
      movcount = movlist.length;
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
  });}catch(error){ console.log('notend'); }
});

module.exports = router;
