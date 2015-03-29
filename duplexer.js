var spawn = require('child_process').spawn;
var duplexer = require('duplexer');

module.exports = function (cmd, args) {
// spawn the process and return a single stream
	var process2 = spawn(cmd,args);
	return duplexer(process2.stdin, process2.stdout);
// joining together the stdin and stdout here
};
