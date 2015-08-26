'use strict';

(function(){
  var Utils = function () {
  };

  Utils.convertEncode = function (data, sCode, tCode) {
    return new Buffer(data, sCode).toString(tCode);
  };

  module.exports = Utils;
})();

  
