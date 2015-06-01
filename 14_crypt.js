var crypto = require('crypto');
var passphrase = process.argv[2];

var stream = crypto.createDecipher('aes256', passphrase);

process.stdin.pipe(stream).pipe(process.stdout);
//stream.write(Buffer([ 135, 197, 164, 92, 129, 90, 215, 63, 92 ]));
//stream.end();
