# sqlcmd-runner

[![npm version](http://img.shields.io/npm/v/sqlcmd-runner.svg)](https://npmjs.org/package/sqlcmd-runner) [![build status](http://img.shields.io/travis/mikeobrien/node-sqlcmd-runner.svg)](https://travis-ci.org/mikeobrien/node-sqlcmd-runner) [![Dependency Status](http://img.shields.io/david/mikeobrien/node-sqlcmd-runner.svg)](https://david-dm.org/mikeobrien/node-sqlcmd-runner) [![npm downloads](http://img.shields.io/npm/dm/sqlcmd-runner.svg)](https://npmjs.org/package/sqlcmd-runner)

Node wrapper for the [sqlcmd](http://msdn.microsoft.com/en-us/library/ms162773.aspx).

## Install

```bash
$ npm install sqlcmd-runner --save
```

## Usage

A promise is returned and fulfilled when sqlcmd succeeds or rejected if it fails.

```js
var sqlcmd = require('sqlcmd-runner');

sqlcmd.({})
    .catch(function(error) { console.log('Failed: ' + error.message); })
    .done(function() { console.log('Done.'); });
```

## Options


## License
MIT License
