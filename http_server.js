var http = require('http');
var fs = require('fs');
var tr = require('through2');

var ucase_stream = tr(function(buf, enc, next){
	this.push(buf.toString().toUpperCase());
	next();
} 
);

var server = http.createServer(function (req, res) {
	if (req.method === 'POST') {
		req.pipe(ucase_stream).pipe(res);
	}
});

server.listen(process.argv[2]);

