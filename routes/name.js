var express = require('express');
var router = express.Router();
var fs = require('fs');
//
// router.post('/', function(req, res, next) {
//   var dirSrc = './public/resource/'+ req.body.category + '/' + req.body.name;
//   var imgcount = 0;
//   var movcount = 0;
//   var movurllist = 0;
//   var unitycount = 0;
//   var unityurllist = 0;
//   var texts = 0;
//   var textcount = 0;
//
//   try{
//   fs.readdir(dirSrc+'/img', function(error, imglist){
//     fs.exists(dirSrc+'/img/null.txt',function(exists){
//       if(exists)
//         imgcount = -1;
//       else
//         imgcount = imglist.length;
//       fs.readdir(dirSrc+'/mov', function(error, movlist){
//         movcount = movlist.length;
//         try{
//           movurllist = fs.readFileSync(dirSrc+'/mov/list.txt', 'utf-8').split('\n');
//           console.log(movurllist);
//         }catch(error){ console.log('mov not exit'); }
//         fs.readdir(dirSrc+'/unity', function(error, unitylist){
//           unitycount = unitylist.length;
//           try{
//             unityurllist = fs.readFileSync(dirSrc + '/unity/list.txt', 'utf-8').split('\n');
//             texts = fs.readFileSync(dirSrc+'/main.txt', 'utf-8').split('\n');
//             textcount = texts.length;
//           }catch(error){ console.log('txt not exit'); }
//           res.render('contents', {
//               content_category: req.body.category,
//               content_title: req.body.name,
//               content_subtitle: 'subtitle',
//               content_imgs: imgcount,
//               content_movs: movcount,
//               content_movurls : movurllist,
//               content_unitys: unitycount,
//               content_unityurls: unityurllist,
//               content_maintext: texts,
//               content_texts: textcount
//           });
//         });
//       });
//     });
//   });}catch(error){ console.log('notend'); }
// });

router.post('/', async function(req, res, next) {
  var dirSrc = './public/resource/'+ req.body.category + '/' + req.body.name;
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
  await res.render('contents', {
      content_category: req.body.category,
      content_title: req.body.name,
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



// legacy
// router.post('/', function(req, res, next) {
//   var dirSrc = './public/resource/'+ req.body.category + '/' + req.body.name;
//   console.log(dirSrc);
//   var imgcount = 0;
//   var movcount = 0;
//   var movurllist = 0;
//   var unitycount = 0;
//   var unityurllist = 0;
//   var texts = 0;
//   var textcount = 0;
//
//   try{
//   fs.readdir(dirSrc+'/img', function(error, imglist){
//     fs.exists(dirSrc+'/img/null.txt',function(exists){
//       if(exists)
//         imgcount = -1;
//       else
//         imgcount = imglist.length;
//       fs.readdir(dirSrc+'/mov', function(error, movlist){
//         movcount = movlist.length;
//         try{
//           movurllist = fs.readFileSync(dirSrc+'/mov/list.txt', 'utf-8').split('\n');
//           console.log(movurllist);
//         }catch(error){ console.log('mov not exit'); }
//         fs.readdir(dirSrc+'/unity', function(error, unitylist){
//           unitycount = unitylist.length;
//           try{
//             unityurllist = fs.readFileSync(dirSrc + '/unity/list.txt', 'utf-8').split('\n');
//             texts = fs.readFileSync(dirSrc+'/main.txt', 'utf-8').split('\n');
//             textcount = texts.length;
//           }catch(error){ console.log('txt not exit'); }
//           res.render('contents', {
//               content_category: req.body.category,
//               content_title: req.body.name,
//               content_subtitle: 'subtitle',
//               content_imgs: imgcount,
//               content_movs: movcount,
//               content_movurls : movurllist,
//               content_unitys: unitycount,
//               content_unityurls: unityurllist,
//               content_maintext: texts,
//               content_texts: textcount
//           });
//         });
//       });
//     });
//   });}catch(error){ console.log('notend'); }
// });

module.exports = router;
