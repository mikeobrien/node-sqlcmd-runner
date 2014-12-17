var process = require('./process'),
    command = require('./command');

module.exports = function(options) {
    return process(command(options));
};