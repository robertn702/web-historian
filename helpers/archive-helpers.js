var fs = require('fs');
var path = require('path');
var request = require('request');
var _ = require('lodash');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  'siteAssets' : path.join(__dirname, '../web/public'),
  'archivedSites' : path.join(__dirname, '../archives/sites'),
  'list' : path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for jasmine tests, do not modify
exports.initialize = function(pathsObj){
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!


var writeUrls = fs.createWriteStream(exports.paths.list, {flags: 'a'});

function loadInit(){
  var urls = fs.readFileSync(exports.paths.list).toString().trim().split('\n');
  var urlT = _.indexBy(urls, function(e){return e});
  return urlT;
};

exports.urlTable = loadInit();
exports.writeFile = function(url){
  var write = fs.createWriteStream(exports.paths.archivedSites + url);
  request("http:/" + url).pipe(write);
};

exports.writeNewUrl = function (url){
  writeUrls.write(url + '\n');
};
