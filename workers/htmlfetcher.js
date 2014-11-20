var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers'));
var fs = require('fs');
var request = require('request');
var _ = require('lodash');

var urlT = archive.urlTable;

_.each(urlT, function (url) {
  if(url.length < 25){
    archive.writeFile(url);
  }
});

process.stdout.write('WORKING')
