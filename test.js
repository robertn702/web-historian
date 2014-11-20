var request = require('request');
var fs = require('fs');
var _ = require('lodash');

var writeUrls = fs.createWriteStream('../archives/sites.txt', {flags: 'a'});
var url = process.argv[2];

var urlTable = loadInit();
getDat(url, urlTable);


function loadInit(){
  var urls = fs.readFileSync('../archives/sites.txt').toString().trim().split('\n');
  var urlT = _.indexBy(urls, function(e){return e});
  return urlT;
};


function getDat(url, urlTable){
  if(!urlTable[url]){
    var write = fs.createWriteStream('../archives/sites/url' + '.html');
    request("http://" + url).pipe(write).on('finish', function(){
      writeUrls.write(url + '\n');
    });
  }else{
    console.log('already exists')
  }
};

