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
        res.render('2021_index', {
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

router.get('/2022', async function(req, res, next){
  var dirSrc = './public/resource/';
  var unitylist;
  var designlist;
  var weblist;

  unitylist = await readDir(dirSrc, 'unity');
  designlist = await readDir(dirSrc, 'design');
  weblist = await readDir(dirSrc, 'web');

  await res.render('index',{
    title : 'Baeknothing_portfolio',

    unitycount: unitylist.length,
    unitylist: unitylist,
    designcount: designlist.length,
    designlist: designlist,
    webcount: weblist.length,
    weblist: weblist
  });
});

async function readDir(path, name){
  try{
    return (fs.promises.readdir(path + name));
  }catch(error){ return (-1); }
}

module.exports = router;
