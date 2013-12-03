
/**
 * Module dependencies.
 */

var winston = require('winston'); // for transports.Console
var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var models = require('./routes/models');
var http = require('http');
var path = require('path');
var request = require('request');
var exphbs  = require('express3-handlebars');
var validator = require('express-validator');
var expressWinston = require('express-winston');

// enable web server logging; pipe those log messages through winston
var winstonStream = {
    write: function(message, encoding){
        winston.info(message);
    }
};



var app = express();
app.use(express.logger({stream:winstonStream}));

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(validator());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);
app.get('/add-model', models.add);
app.post('/add-model', models.add);
app.post('/image', models.image);

http.createServer(app).listen(app.get('port'), function() {
	winston.info('Hull Breach Detected on Deck 7!');
  console.log('Express server listening on port ' + app.get('port'));
});
