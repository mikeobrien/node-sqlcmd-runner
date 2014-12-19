var process = require('child_process'),
    path = require('path'),
    Q = require('q');

module.exports = function(command) {

    console.log();
    console.log(command.path + ' ' + command.args.join(' '));
    console.log();

    var sqlcmd = process.spawn(command.path, command.args);

    var log = function(message) { 
        message = message.toString('utf8');
        console.log(message); 
        return message;
    };

    var stdout = '';
    var stderr = '';

    sqlcmd.stdout.on('data', function(message) { stdout += log(message); });
    sqlcmd.stderr.on('data', function(message) { stderr += log(message); });

    var deferred = Q.defer();

    sqlcmd.on('exit', function(code) { 
        console.log('Exit code: ' + code);
        if (code > 0) {
            var message = 'sqlcmd failed' + (stderr ? 
                ': \r\n\r\n' + stderr : '.');
            deferred.reject(new Error(message));
        }
        else deferred.resolve();
    });

    return deferred.promise;   

};