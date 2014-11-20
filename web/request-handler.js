var path = require('path');
var archive = require('../helpers/archive-helpers');
var httpHelp = require('./http-helpers.js');

var routes = {
  "GET": function(req, res) {
    var url = req.url;
    if(url === '/'){
      url = '/index.html';
    }

    if(!archive.urlTable[url]){
      httpHelp.serveAssets(res, 200, archive.paths.siteAssets + url);
    }else{
      httpHelp.serveAssets(res, 200, archive.paths.archivedSites + url);
    }
  },
  "POST": function(req, res) {
    req.on('data', function(data){
      var postedUrl = '/' + data.toString().split('=')[1];
      var haveSite = archive.urlTable[postedUrl];
      if(!haveSite){
        archive.writeNewUrl(postedUrl);
        archive.urlTable[postedUrl] = postedUrl;
        httpHelp.serveAssets(res, 302, archive.paths.siteAssets + '/loading.html');
      }else{
        httpHelp.serveAssets(res, 302, archive.paths.archivedSites + postedUrl);
      };
    })
  }
};

exports.handleRequest = function (req, res) {
  routes[req.method](req, res);
};
