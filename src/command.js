var _ = require('lodash');

function toWindowsPath(path) {
    return path.replace(/\//g, '\\');
}

module.exports = function(options) {
    var args = [];

    if (options.server) {
        var server;
        if (_.isString(options.server)) server = options.server; 
        else {
            server = options.server.name;
            if (options.server.protocol) server = options.server.protocol + ':' + server;
            if (options.server.instance) server += '\\' + options.server.instance;
            if (options.server.port) server += ',' + String(options.server.port);
        }
        args.push('-S', server);
    }
    if (options.database) args.push('-d', options.database);
    if (options.trustedConnection) args.push('-E');
    if (options.username) args.push('-U', options.username);
    if (options.password) args.push('-P', options.password);
    if (options.dedicatedAdminConnection) args.push('-A');
    if (options.trustServerCert) args.push('-C');
    if (options.loginTimeout) args.push('-l', String(options.loginTimeout));
    if (options.workstationName) args.push('-H', options.workstationName);
    if (options.applicationIntent) args.push('-K', options.applicationIntent);
    if (options.multisubnetFailover) args.push('-M');
    if (options.encryptedConnection) args.push('-N');
    if (options.newPassword) args.push('-Z', options.newPassword);
    
    if (options.inputFiles) options.inputFiles
        .forEach(function(path) { args.push('-i', toWindowsPath(path)); });
    if (options.outputFile) args.push('-o', toWindowsPath(options.outputFile));
    if (options.codepage) {
        var codepage = options.codepage;
        var codepages = [];
        if (_.isString(codepage)) 
            codepages.push(codepage);
        else {
            if (codepage.input) 
                codepages.push('i:' + codepage.input);
            if (codepage.output) 
                codepages.push('o:' + codepage.output);
        }
        args.push('-f', codepages.join(','));
    }
    if (options.errorRedirection) {
        args.push('-r' + (options.errorRedirection.all ? '1' : ''));
    }
    if (options.localizeResults) args.push('-R');
    if (options.unicodeOutput) args.push('-u');

    if (options.query) args.push('-Q', options.query);
    if (options.variables) _.forOwn(options.variables, 
        function(value, name) { args.push('-v', name + '=' + value); });
    if (options.queryTimeout) args.push('-t', String(options.queryTimeout));
    if (options.printInputScripts) args.push('-e');
    if (options.quoteIdentifier) args.push('-I');
    if (options.ignoreVariables) args.push('-x');

    if (options.headers) args.push('-h', String(options.headers));
    if (options.removeControlChars) {
        var removeOptions = '';
        if (options.removeControlChars.single) removeOptions = '1';
        if (options.removeControlChars.consecutive) removeOptions = '2';
        args.push('-k' + removeOptions);
    }
    if (options.columnSeperator) args.push('-s', options.columnSeperator);
    if (options.columnWidth) args.push('-w', String(options.columnWidth));
    if (options.removeTrailingSpaces) args.push('-W');
    if (options.variableLengthDisplayWidth) args.push('-y', String(options.variableLengthDisplayWidth));
    if (options.fixedLengthDisplayWidth) args.push('-Y', String(options.fixedLengthDisplayWidth));

    if (options.failOnSqlErrors) args.push('-b');
    if (options.errorLevel) args.push('-m', String(options.errorLevel));
    if (options.errorSeverityLevel) args.push('-V', String(options.errorSeverityLevel));

    if (options.packetSize) args.push('-a', String(options.packetSize));
    if (options.batchTerminator) args.push('-c', options.batchTerminator);
    if (options.perfStats) { 
        args.push('-p' + (options.perfStats.colonSeperated ? '1' : ''));
    }
    if (options.enhancedSecurity) { 
        args.push('-X' + (options.enhancedSecurity.failOnErrors ? '1' : ''));
    }

    return {
        path: 'sqlcmd',
        args: args
    };
};