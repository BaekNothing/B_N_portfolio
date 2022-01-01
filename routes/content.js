var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', async function(req, res, next) {
  var dirSrc = './public/resource/'+ req.query.category + '/' + req.query.name;

  var imglist = 0;
  var imgcount = 0;
  var movcount = 0;
  var movurllist = 0;
  var gitcount = 0;
  var giturllist = 0;
  var unitycount = 0;
  var unityurllist = 0;
  var texts = 0;
  var textcount = 0;

  imglist = await readdirectory(dirSrc, '/img');
  if (imglist == 0 || imglist[0] == "null.txt")
    imgcount = -1;
  else
    imgcount = imglist.length;

  movurllist = await readfile(dirSrc, '/mov', '/list.txt');
  if (movurllist == "file not exists" || movurllist[0] == "null")
    movcount = -1;
  else
    movcount = movurllist.length;

  giturllist = await readfile(dirSrc, '/git', '/list.txt');
  if (giturllist == "file not exists")
    gitcount = -1;
  else
    gitcount = giturllist.length;

  unityurllist = await readfile(dirSrc, '/unity', '/list.txt');
  if (unityurllist == "file not exists")
    unitycount = -1;
  else
    unitycount = unityurllist.length;

  texts = await readfile(dirSrc, '', '/main.txt');
  textcount = texts.length;

  console.log(
      imglist + ', ' +
      imgcount + ', ' +
      movcount + ', ' +
      movurllist + ', ' +
      gitcount + ', ' +
      giturllist + ', ' +
      unitycount + ', ' +
      unityurllist + ', ' +
      texts + ', ' +
      textcount
  );

  await res.render('content', {
      content_category: req.query.category,
      content_title: req.query.name,
      content_subtitle: 'subtitle',
      content_imgs: imgcount,
      content_imglist: imglist,
      content_movs: movcount,
      content_movurls : movurllist,
      content_gits: gitcount,
      content_giturls: giturllist,
      content_unitys: unitycount,
      content_unityurls: unityurllist,
      content_maintext: texts,
      content_texts: textcount
  });
});

async function readdirectory(dirSrc, path){
  try{
    return fs.promises.readdir(dirSrc + path);
  }catch(error){
    //console.log(error)
    return 0;
  }
}

async function readfile(dirSrc, path, name){
  try{
    return fs.readFileSync(dirSrc + path + name, 'utf-8').split('\n');
  }catch(error){
    //console.log(error);
    return "file not exists";};
}


async function readDir(path, name){
  try{
    return (fs.promises.readdir(path + name));
  }catch(error){ return (-1); }
}


module.exports = router;
