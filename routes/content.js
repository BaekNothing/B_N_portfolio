var express = require('express');
var router = express.Router();
var fs = require('fs');

router.get('/', async function(req, res, next) {
  var dirSrc = './public/resource/'+ req.query.name;

  await res.render('contents/' + req.query.name, {
    title: 'Baeknothing_portfolio',
    content_title: req.query.name
  });
});

router.get('/:name', async function(req, res, next) {
  var dirSrc = './public/resource/'+ req.params.name;

  // await res.render('contents/' + req.params.name, {
  //   title: 'Baeknothing_portfolio',
  //   content_title: req.query.name
  // });
});

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
