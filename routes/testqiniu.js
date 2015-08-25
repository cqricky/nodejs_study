var express = require('express');
var qiniu = require('qiniu');
var router = express.Router();


qiniu.conf.ACCESS_KEY = 's4YnD3bKg0kXwp46IzG0LdUj__KdudUEEwlkBgKh';
qiniu.conf.SECRET_KEY = 'kKkFagGQjEYW5pnvMun9nGsGhPsolUSgactBSyQn';

function uptoken(bucketname) {
  var putPolicy = new qiniu.rs.PutPolicy(bucketname);
  //putPolicy.callbackUrl = callbackUrl;
  //putPolicy.callbackBody = callbackBody;
  //putPolicy.returnUrl = returnUrl;
  //putPolicy.returnBody = returnBody;
  //putPolicy.asyncOps = asyncOps;
  //putPolicy.expires = expires;

  return putPolicy.token();
}

/* GET users listing. */
router.get('/', function(req, res, next) {

  console.log('token: ' + uptoken('whitebeach-audio'));

  res.send('respond with a resource');
});

module.exports = router;
