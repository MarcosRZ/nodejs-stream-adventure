var tr = require('through2');
var stream = tr(function(buffer, encoding, next){

	this.push(buffer.toString().toUpperCase());
	next();
});

process.stdin.pipe(stream).pipe(process.stdout);
