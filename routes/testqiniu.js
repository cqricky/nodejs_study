var express = require('express');
var qiniu = require('qiniu');
var URL = require('url');
var qs = require('querystring');
var Utils = require('../lib/util/utils');
var router = express.Router();


// qiniu.conf.ACCESS_KEY = 's4YnD3bKg0kXwp46IzG0LdUj__KdudUEEwlkBgKh';
// qiniu.conf.SECRET_KEY = 'kKkFagGQjEYW5pnvMun9nGsGhPsolUSgactBSyQn';

qiniu.conf.ACCESS_KEY = 'sJNKCyMMhVi-iMONbIFFWgcPgu3AihjvV35YbzCB';
qiniu.conf.SECRET_KEY = 'AGLUm7ReHzsQJ3sB7aaZBlHbC3xPyfCWSSrS3b10';

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  //putPolicy.callbackUrl = 'http://localhost/qiniu/callback';
  //putPolicy.callbackBody = callbackBody;
  putPolicy.returnUrl = 'http://localhost:3000/qiniu/callback';
  putPolicy.returnBody ='name=$(fname)&hash=$(etag)&key=$(key)&type=$(mimeType)';
  //putPolicy.asyncOps = asyncOps;
  //putPolicy.expires = expires;

  return putPolicy.token();
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  // var qiniuToken = uptoken('whitebeach-audio');
  var qiniuToken = uptoken('ricky-test');

  console.log('token: ' + qiniuToken);

  res.render('testqiniu', {
    token : qiniuToken,
    key : 'rickytest'
  });
  //res.send('respond with a resource');
});

router.get('/callback', function(req, res, next){

  var p = URL.parse(req.url, true);

  // var b = new Buffer(p.query.upload_ret, 'base64')
  // var s = b.toString('utf8');

  var s = Utils.convertEncode(p.query.upload_ret, 'base64', 'utf8')
  var param = URL.parse(s, true).query;

  //var fileJson = JSON.parse(s);
  console.log('URL.parse(s, true): ' + URL.parse(s, true));
  console.log('param.name: ' + param.name);
  console.log('param.hash: ' + param.hash);
  console.log('param.key: ' + param.key);
  console.log('param.type: ' + param.type);
  console.log(s);
  //console.log
  // console.log('req.url: ' + req.url);
  // console.log(p);
  // console.log(p.query.upload_ret);
  console.log('callback auccess');
  res.send('callback page after upload to qiniu.');
});

module.exports = router;
