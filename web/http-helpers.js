var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  'Content-Type': "text/html"
};

exports.serveAssets = function(res, status, asset, callback) {
  var read = fs.createReadStream(asset)
  status = status || 200;
  read.on('error', function(e){
    console.log('e in serveAssets')
    res.writeHead(404, exports.headers);
    res.end();
  });
  res.writeHead(status, exports.headers);
  read.pipe(res);
};



// As you progress, keep thinking about what helper functions you can put here!
