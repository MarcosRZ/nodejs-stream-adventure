var combine = require('stream-combiner')
var split = require('split')
var zlib = require('zlib')
var tr = require('through2')

var genres = [];

var gzip_stream = zlib.createGzip();
var classify_stream = tr(function (line, encoding, next){

        var elem = JSON.parse(line);

        if (elem.type == 'genre'){
		if (genres.length > 0){
			var next_line = JSON.stringify(genres.pop()) + '\n';
			this.push(next_line);
			console.log(next_line);
		}
                genres.push({ "name": elem.name, "books": [] });
        } else if (elem.type == 'book'){
                var genre = genres.pop();
                genre.books.push(elem.name);
                genres.push(genre);
        }

        next();
}, function(done){
	// Are you forgetting the last element?
	var next_line = JSON.stringify(genres.pop()) + '\n';
        this.push(next_line);
        console.log(next_line);
	done();
}
);

module.exports = function () {
	return combine(classify_stream, gzip_stream);
}



