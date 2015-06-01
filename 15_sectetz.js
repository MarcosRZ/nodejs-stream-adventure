var tar = require('tar');
var zlib = require('zlib');
var crypto = require('crypto');
var through = require('through2');

var decipher_stream = crypto.createDecipher(process.argv[2], process.argv[3]);
var gunzip_stream = zlib.createGunzip();
var tar_parser = tar.Parse();

process.stdin
	.pipe(decipher_stream)
	.pipe(gunzip_stream)
	.pipe(tar_parser);

tar_parser.on('entry', function(e) {
    if (e.type !== 'File') return;
    var md5_stream = crypto.createHash('md5', { encoding: 'hex' });
    e.pipe(md5_stream).pipe(through(function(md5) {
        console.log(md5 + ' ' + e.path);
    }));
});

