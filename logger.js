/**
 * Very Simple wrapper for logging with winston
 */

var winston = require('winston'); // load the logging
winston.add(winston.transports.File, { filename: 'somefile.log' });

module.exports = winston;
