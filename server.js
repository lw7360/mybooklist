var http = require('http');
var express = require('express');
var ecstatic = require('ecstatic');

var app = express();
var port = process.env.PORT || 9991;
app.use(ecstatic({ root: __dirname + '/public' }));
http.createServer(app).listen(port);

console.log('Listening on :' + port);
