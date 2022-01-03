var express = require('express');
var router = express.Router();
var fs = require('fs');

/* GET home page. */
router.get('/2021', async function(req, res, next) {
  var dirSrc = './public/resource/2021/';
  var unitylist = await readDir(dirSrc, 'unity');
  var designlist = await readDir(dirSrc, 'design');
  var weblist = await readDir(dirSrc, 'web');

  try{
    await res.render('2021/2021_index', {
            title: 'Baeknothing_portfolio',
            unitycount: unitylist.length,
            unitylist: unitylist,

            designcount: designlist.length,
            designlist: designlist,

            webcount: weblist.length,
            weblist: weblist
    });
  }catch(error){console.log(error);}
});

router.get('/', async function(req, res, next){
  var dirSrc = './public/resource/imgs/contents';
  var contentlist;

  contentlist = await readDir(dirSrc, '');
  console.log(contentlist);
  await res.render('index', {
    title : 'Baeknothing_portfolio',
    contentcount: contentlist.length,
    contentlist: contentlist
  });
});

async function readDir(path, name){
  try{
    return (fs.promises.readdir(path + name));
  }catch(error){ return (-1); }
}

module.exports = router;
