var expect = require('chai').expect,
    cases = require('cases'),
    command = require('../src/command.js');

describe('command', function() {

    it('should set options', cases([
        [ { server: 'server' }, ['-S', 'server'] ],
        [ { server: { name: 'server', protocol: 'tcp', 
                      instance: 'instance', port: 1433} }, 
                      ['-S', 'tcp:server\\instance,1433'] ],
        [ { database: 'db' }, ['-d', 'db'] ],
        [ { trustedConnection: true }, ['-E'] ],
        [ { username: 'un' }, ['-U', 'un'] ],
        [ { password: 'pw' }, ['-P', 'pw'] ],
        [ { dedicatedAdminConnection: true }, ['-A'] ],
        [ { trustServerCert: true }, ['-C'] ],
        [ { loginTimeout: 30 }, ['-l', '30'] ],
        [ { workstationName: 'wsn' }, ['-H', 'wsn'] ],
        [ { applicationIntent: 'ReadOnly' }, ['-K', 'ReadOnly'] ],
        [ { multisubnetFailover: true }, ['-M'] ],
        [ { encryptedConnection: true }, ['-N'] ],
        [ { newPassword: 'npw' }, ['-Z', 'npw'] ],
        
        [ { inputFiles: ['path/to/if1', 'path/to/if2'] }, ['-i', 'path\\to\\if1', '-i', 'path\\to\\if2'] ],
        [ { outputFile: 'path/to/of' }, ['-o', 'path\\to\\of'] ],
        [ { codepage: 'cp' }, ['-f', 'cp'] ],
        [ { codepage: { input: 'icp' } }, ['-f', 'i:icp'] ],
        [ { codepage: { output: 'ocp' } }, ['-f', 'o:ocp'] ],
        [ { codepage: { input: 'icp', output: 'ocp' } }, ['-f', 'i:icp,o:ocp'] ],
        [ { errorRedirection: true }, ['-r'] ],
        [ { errorRedirection: { all: true } }, ['-r1'] ],
        [ { localizeResults: true }, ['-R'] ],
        [ { unicodeOutput: true }, ['-u'] ],

        [ { query: 'SELECT * FROM Users' }, ['-Q', 'SELECT * FROM Users'] ],
        [ { variables: { var1: 'val1', var2: 'val2' } }, ['-v', 'var1=val1', '-v', 'var2=val2'] ],
        [ { queryTimeout: 30 }, ['-t', '30'] ],
        [ { printInputScripts: true }, ['-e'] ],
        [ { quoteIdentifier: true }, ['-I'] ],
        [ { ignoreVariables: true }, ['-x'] ],

        [ { headers: 2 }, ['-h', '2'] ],
        [ { removeControlChars: true }, ['-k'] ],
        [ { removeControlChars: { single: true } }, ['-k1'] ],
        [ { removeControlChars: { consecutive: true } }, ['-k2'] ],
        [ { columnSeperator: ';' }, ['-s', ';'] ],
        [ { columnWidth: 200 }, ['-w', '200'] ],
        [ { removeTrailingSpaces: true }, ['-W'] ],
        [ { variableLengthDisplayWidth: 200 }, ['-y', '200'] ],
        [ { fixedLengthDisplayWidth: 200 }, ['-Y', '200'] ],

        [ { failOnSqlErrors: true }, ['-b'] ],
        [ { errorLevel: 4 }, ['-m', '4'] ],
        [ { errorSeverityLevel: 5 }, ['-V', '5'] ],

        [ { packetSize: 512 }, ['-a', '512'] ],
        [ { batchTerminator: 'GO' }, ['-c', 'GO'] ],
        [ { perfStats: true }, ['-p'] ],
        [ { perfStats: { colonSeperated: true } }, ['-p1'] ],
        [ { enhancedSecurity: true }, ['-X'] ],
        [ { enhancedSecurity: { failOnErrors: true } }, ['-X1'] ],
        ], function(config, args) {
        expect(command(config).args).to.deep.equal(args);
    }));

});
