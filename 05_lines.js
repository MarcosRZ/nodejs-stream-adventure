var line_number = 1;
var tr = require('through2');

var stream = tr(function(buffer, encoding, next){
	if (line_number % 2 == 0){
	        this.push(buffer.toString().toUpperCase()+'\n');
        } else {
		this.push(buffer.toString().toLowerCase()+'\n');
	}
	line_number++;
	next();
});

var split = require('split');
process.stdin.pipe(split()).pipe(stream).pipe(process.stdout);
