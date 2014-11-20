var path = require('path');
var archive = require(path.join(__dirname, '../helpers/archive-helpers'));
var fs = require('fs');
var request = require('request');
var _ = require('lodash');

var urlT = archive.urlTable;

_.each(urlT, function (url) {
  archive.writeFile(url);
});
