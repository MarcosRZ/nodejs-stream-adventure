var trumpet = require('trumpet');
var through = require('through2');
var tr = trumpet();

tr.pipe(process.stdout);

var ucase_stream = through(function(buffer, encoding, next){

        this.push(buffer.toString().toUpperCase());
        next();
});

var loud = tr.select('.loud').createStream();

loud.pipe(ucase_stream).pipe(loud);

process.stdin.pipe(tr);
