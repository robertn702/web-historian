var http = require("http");
var handler = require("./request-handler");

var port = process.argv[2] || 8080;
var ip = process.argv[3] || '127.0.0.1';
var server = http.createServer(handler.handleRequest);

console.log("Listening on http://" + ip + ":" + port);
server.listen(port, ip);

