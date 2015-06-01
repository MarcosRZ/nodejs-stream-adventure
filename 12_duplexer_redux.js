var duplexer = require('duplexer2');
var tr = require('through2');

module.exports = function (counter) {
	var countries = {};	
	
	var counter_stream = tr.obj(function(chunk, encoding, next){

		countries[chunk.country] = (countries[chunk.country] || 0) + 1;
		//this.push(chunk);		
		next();
	},
	function(done){
		counter.setCounts(countries);
		done();
	}	
	);

	return duplexer(counter_stream,counter);
};

