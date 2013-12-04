
/*
 * GET home page.
 */

//http://localhost:8090/kink-modelapplication-rest/modelapplication
var logger = require('../logger'); // load the logging

exports.index = function(req, res){
  logger.log('info', "this is a info message");
  // logger.log('warn', "this is a warning message");
  // logger.log('error', "this is an error message");
  // logger.info("this is a info message");
  // logger.warn("this is a warning message");
  logger.error("this is an error message");
  logger.log("debug", "this is a debug message");
  // console.log(logger.info("asdf"));
  res.render('index', { title: 'Live Model Application' });
};
