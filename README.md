# sqlcmd-runner

[![npm version](http://img.shields.io/npm/v/sqlcmd-runner.svg?style=flat)](https://npmjs.org/package/sqlcmd-runner) [![build status](http://img.shields.io/travis/mikeobrien/node-sqlcmd-runner.svg?style=flat)](https://travis-ci.org/mikeobrien/node-sqlcmd-runner) [![Dependency Status](http://img.shields.io/david/mikeobrien/node-sqlcmd-runner.svg?style=flat)](https://david-dm.org/mikeobrien/node-sqlcmd-runner) [![npm downloads](http://img.shields.io/npm/dm/sqlcmd-runner.svg?style=flat)](https://npmjs.org/package/sqlcmd-runner)

Node wrapper for the [sqlcmd](http://msdn.microsoft.com/en-us/library/ms162773.aspx).

## Install

```bash
$ npm install sqlcmd-runner --save
```

## Usage

A promise is returned and fulfilled when sqlcmd succeeds or rejected if it fails.

```js
var sqlcmd = require('sqlcmd-runner');

sqlcmd({ ... })
    .catch(function(error) { console.log('Failed: ' + error.message); })
    .done(function() { console.log('Done.'); });
```

## Options

The folowing are the options supported by this module. These map directly to the `sqlcmd` CLI parameters [here](http://msdn.microsoft.com/en-us/library/ms162773.aspx).

- [Login](#login)
- [Input/Output](#inputoutput)
- [Query Execution](#query-execution)
- [Formatting](#formatting)
- [Error Reporting](#error-reporting)
- [Miscellaneous](#miscellaneous)

### Login

```js
sqlcmd({

    // Specifies the instance of SQL ServerIt sets the sqlcmd scripting variable 
    // SQLCMDSERVER. Specify server_name to connect to the default instance of SQL Server 
    // on that server computer. Specify the server name and instance to connect to a named 
    // instance of SQL Server on that server. If no server is specified, sqlcmd connects 
    // to the default instance of SQL Server on the local computer. This option is required 
    // when you execute sqlcmd from a remote computer on the network. protocol can be 
    // tcp (TCP/IP), lpc (shared memory), or np (named pipes). If you do not specify a 
    // server name or instance name when you start sqlcmd, SQL Server checks for and uses 
    // the SQLCMDSERVER environment variable. (-S)
    server: 'myserver' | {

        name: 'myserver',
        protocol: 'tcp|lpc|np',
        instance: 'default',
        port: 1433

    }

    // : Issues a USE db_name statement when you start sqlcmd. This option sets the sqlcmd 
    // scripting variable SQLCMDDBNAME. This specifies the initial database. The default is 
    // your login's default-database property. (-d)
    database: 'dbname',

    // Uses a trusted connection instead of using a user name and password to log on to 
    // SQL Server. By default, sqlcmd uses a trusted connection. This option ignores 
    // possible user name and password environment variable settings such as 
    // SQLCMDPASSWORD. (-E)
    trustedConnection: true|false,

    // The user login ID. If neither the username or password are specified, sqlcmd tries to 
    // connect by using Microsoft Windows Authentication mode. Authentication is based on 
    // the Windows account of the user who is running sqlcmd. (-U)
    username: 

    // The user-specified password. Passwords are case sensitive. If the username is 
    // specified but not the password, and the SQLCMDPASSWORD environment variable 
    // has not been set, sqlcmd prompts the user for a password. (-P)
    password: 'p@$$w0rd',

    // Logs in to SQL Server with a Dedicated Administrator Connection (DAC). This kind of 
    // connection is used to troubleshoot a server. This will only work with server 
    // computers that support DAC. If DAC is not available, sqlcmd generates an error 
    // and then exits. (-A)
    dedicatedAdminConnection: true|false,

    // This switch is used by the client to configure it to implicitly trust the server 
    // certificate without validation. This option is equivalent to the ADO.NET option 
    // TRUSTSERVERCERTIFICATE = true. (-C)
    trustServerCert: true|false,

    // Specifies the number of seconds before a sqlcmd login to the ODBC driver times out 
    // when you try to connect to a server. This option sets the sqlcmd scripting variable 
    // SQLCMDLOGINTIMEOUT. The default time-out for login to sqlcmd is eight seconds. The 
    // login time-out must be a number between 0 and 65534. A value of 0 specifies 
    // time-out to be infinite. (-l)
    loginTimeout: 30,

    // A workstation name. This option sets the sqlcmd scripting variable SQLCMDWORKSTATION. 
    // The workstation name is listed in the hostname column of the sys.processes catalog 
    // view and can be returned using the stored procedure sp_who. If this option is not 
    // specified, the default is the current computer name. This name can be used to 
    // identify different sqlcmd sessions. (-H)
    workstationName: 'hostname',

    // Declares the application workload type when connecting to a server. The only 
    // currently supported value is ReadOnly. If this is not specified, the sqlcmd utility 
    // will not support connectivity to a secondary replica in an AlwaysOn 
    /// availability group. (-K)
    applicationIntent: 'ReadOnly',

    // Always specify this option when connecting to the availability group listener of a 
    // SQL Server availability group or a SQL Server Failover Cluster Instance. This 
    // option provides for faster detection of and connection to the (currently) active 
    // server. If this option is not specified, it is off. (-M)
    multisubnetFailover: true|false,

    // This switch is used by the client to request an encrypted connection. (-N)
    encryptedConnection: true|false,

    // Change a password. (-Z)
    newPassword: 'p@$$w0rd'

});
```
### Input/Output

```js
sqlcmd({

    // Identifies the file that contains a batch of SQL statements or stored procedures. 
    // Multiple files may be specified that will be read and processed in order. sqlcmd will 
    // first check to see whether all the specified files exist. If one or more files do 
    // not exist, sqlcmd will exit. Cannot be used in conjunction with a query. 
    // NOTE: Forward slashes are automatically converted to back slashes. (-i)
    inputFiles: ['path/to/input1', 'path/to/input2'],

    // Identifies the file that receives output from sqlcmd. If unicode is specified, the 
    // output_file is stored in Unicode format. sqlcmd does not support concurrent writing 
    // of multiple sqlcmd processes to the same file. The file output will be corrupted or 
    // incorrect. See the codepage for more information about file formats. This file will 
    // be created if it does not exist. A file of the same name from a prior sqlcmd session 
    // will be overwritten. The file specified here is not the stdout file. If a stdout file 
    // is specified this file will not be used. (-o)
    // NOTE: Forward slashes are automatically converted to back slashes.
    outputFile: 'path/to/output',

    // Specifies the input and output code pages. The codepage number is a numeric value 
    // that specifies an installed Windows code page.
    // Code-page conversion rules:
    // If no code pages are specified, sqlcmd will use the current code page for both input 
    // and output files, unless the input file is a Unicode file, in which case no 
    // conversion is required. sqlcmd automatically recognizes both big-endian and 
    // little-endian Unicode input files. If the unicodeOutput option has been specified, 
    // the output will always be little-endian Unicode. If no output file is specified, the 
    // output code page will be the console code page. This enables the output to be 
    // displayed correctly on the console. Multiple input files are assumed to be of the 
    // same code page. Unicode and non-Unicode input files can be mixed.
    // Accepts either a string with the codepage for both input and output files or an
    // object with seperate codepages for input and output. (-f)
    codepage: '65001' | {
        
        // Input files codepage.
        input: '65001',

        // Output file codepage.
        output: '65001'

    },

    // Redirects the error message output to the screen (stderr). When enabled, only error 
    // messages that have a severity level of 11 or higher are redirected. By default 
    // messages are sent to stdout. (-r)
    errorRedirection: true | {

        // All error message output, regardless of severity level, including PRINT is 
        // redirected. Has no effect if you specify an output file. (-r1)
        all: true|false

    },

    // Causes sqlcmd to localize numeric, currency, date, and time columns retrieved from 
    // SQL Server based on the client’s locale. By default, these columns are displayed 
    // using the server’s regional settings. (-R)
    localizeResults: true|false,

    // Specifies that output_file is stored in Unicode format, regardless of the format of 
    // input_file. (-u)
    unicodeOutput: true|false

});
```
### Query Execution

```js
sqlcmd({

    // Executes a query when sqlcmd starts and then immediately exits sqlcmd. Multiple-
    // semicolon-delimited queries can be executed. Use quotation marks around the query, 
    // as shown in the following example. Do not use the GO terminator in the query. (-Q)
    query: 'SELECT * FROM Users',

    // Creates a sqlcmdscripting variable that can be used in a sqlcmd script. (-v)
    variables: {
        name: 'value',
        ...
    },

    // Specifies the number of seconds before a command (or SQL statement) times out. This 
    // option sets the sqlcmd scripting variable SQLCMDSTATTIMEOUT. If a time_out value is 
    // not specified, the command does not time out. The query time_out must be a number 
    // between 1 and 65534. The actual time out value may vary from the specified time_out 
    // value by several seconds. (-t)
    queryTimeout: 30,

    // Writes input scripts to the standard output device (stdout). (-e)
    printInputScripts: true|false,

    // Sets the SET QUOTED_IDENTIFIER connection option to ON. By default, 
    // it is set to OFF. (-I)
    quoteIdentifier:  true|false,

    // Causes sqlcmd to ignore scripting variables. This is useful when a script contains 
    // many INSERT statements that may contain strings that have the same format as regular 
    // variables, such as $(variable_name). (-x)
    ignoreVariables: true|false

});
```
### Formatting

```js
sqlcmd({

    // Specifies the number of rows to print between the column headings. The default is to 
    // print headings one time for each set of query results. This option sets the sqlcmd 
    // scripting variable SQLCMDHEADERS. Use -1 to specify that headers must 
    // not be printed. (-h)
    headers: 1,

    // Removes all control characters, such as tabs and new line characters from the output. 
    // This preserves column formatting when data is returned. (-k)
    removeControlChars: true | {

        // Control characters are replaced by a single space. (-k1)
        single: true|false,

        // Consecutive control characters are replaced by a single space. (-k2)
        consecutive: true|false,

    },

    // Specifies the column-separator character. The default is a blank space. This option 
    // sets the sqlcmd scripting variable SQLCMDCOLSEP. To use characters that have special 
    // meaning to the operating system such as the ampersand (&), or semicolon (;), enclose 
    // the character in quotation marks ("). The column separator can be any 
    // 8-bit character. (-s)
    columnSeperator: ';',

    // Specifies the screen width for output. This option sets the sqlcmd scripting variable 
    // SQLCMDCOLWIDTH. The column width must be a number greater than 8 and less than 65536. 
    // If the specified column width does not fall into that range, sqlcmd generates and 
    // error message. The default width is 80 characters. When an output line exceeds the 
    // specified column width, it wraps on to the next line. (-w)
    columnWidth: 10,

    // This option removes trailing spaces from a column. Use this option together with the 
    // columnSeperator option when preparing data that is to be exported to another 
    // application. Cannot be used with the display width options. (-W)
    removeTrailingSpaces: true|false,

    // Sets the sqlcmd scripting variable SQLCMDMAXFIXEDTYPEWIDTH. The default is 256. It 
    // limits the number of characters that are returned for large variable length types:
    // varchar(max), nvarchar(max), varbinary(max), xml, UDT, text, ntext and image
    // UDTs can be of fixed length depending on the implementation. If this length of a 
    // fixed length UDT is shorter that display_width, the value of the UDT returned is 
    // not affected. However, if the length is longer than display_width, the output is 
    // truncated. If display_width is 0, the output is truncated at 1 MB. Specify 0 with 
    // extreme caution because it may cause serious performance issues on both the server 
    // and the network, depending on the size of data returned. (-y)
    variableLengthDisplayWidth: 200,

    // Sets the sqlcmd scripting variable SQLCMDMAXVARTYPEWIDTH. The default is 0 
    // (unlimited). Limits the number of characters that are returned for the 
    // following data types: char(1-8000), nchar(1-4000), varchar(1-8000), 
    // nvarchar(1-4000), varbinary(1-8000). (-Y)
    fixedLengthDisplayWidth: 200

});
```
### Error Reporting

```js
sqlcmd({

    // Specifies that sqlcmd exits and returns a DOS ERRORLEVEL value when an error occurs. 
    // The value that is returned to the DOS ERRORLEVEL variable is 1 when the SQL Server 
    // error message has a severity level greater than 10; otherwise, the value returned 
    // is 0. If the severity level has been set in addition to this, sqlcmd will not report 
    // an error if the severity level is lower than the level configured. Command prompt 
    // batch files can test the value of ERRORLEVEL and handle the error appropriately. 
    // sqlcmd does not report errors for severity level 10 (informational messages).
    // If the sqlcmd script contains an incorrect comment, syntax error, or is missing a 
    // scripting variable, ERRORLEVEL returned is 1. (-b)
    failOnSqlErrors: true|false,

    // Controls which error messages are sent to stdout. Messages that have a severity level 
    // greater than or equal to this level are sent. When this value is set to -1, all 
    // messages including informational messages, are sent. This option also sets the sqlcmd 
    // scripting variable SQLCMDERRORLEVEL. This variable has a default of 0. (-m)
    errorLevel: 1,

    // Controls the severity level that is used to set the ERRORLEVEL variable. Error 
    // messages that have severity levels greater than or equal to this value set 
    // ERRORLEVEL. Values that are less than 0 are reported as 0. Batch and CMD files can 
    // be used to test the value of the ERRORLEVEL variable. (-V)
    errorSeverityLevel: 1

});
```
### Miscellaneous

```js
sqlcmd({

    // Requests a packet of a different size. This option sets the sqlcmd scripting variable 
    // SQLCMDPACKETSIZE. packet_size must be a value between 512 and 32767. The default = 
    // 4096. A larger packet size can enhance performance for execution of scripts that have 
    // lots of SQL statements between GO commands. You can request a larger packet size. 
    // However, if the request is denied, sqlcmd uses the server default for 
    // packet size. (-a)
    packetSize: 512,

    // Specifies the batch terminator. By default, commands are terminated and sent to SQL 
    // Server by typing the word "GO" on a line by itself. When you reset the batch 
    // terminator, do not use Transact-SQL reserved keywords or characters that have special 
    // meaning to the operating system, even if they are preceded by a backslash. (-c)
    batchTerminator: 'GO',

    // Prints performance statistics for every result set. (-p)
    perfStats: true | {

        // Indicates that performance stats should be comma seperated. (-p1)
        colonSeperated: true|false

    },

    // Disables the ED and !! commands as they might compromise system security when sqlcmd  
    // is executed from a batch file. The disabled commands are still recognized; sqlcmd  
    // issues a warning messageand continues. It prevents environment variables from being 
    // passed on to sqlcmd. It also prevents the startup script specified by using the 
    // SQLCMDINI scripting variable from being executed. (-X)
    enhancedSecurity: true | {

        // sqlcmd generates an error message and then exits. (-X1)
        failOnErrors: true|false

    }

})
```

## License
MIT License
