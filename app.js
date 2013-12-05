
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
//var user = require('./routes/user');
var models = require('./routes/models');
var uploader = require('./routes/uploader');
var http = require('http');
var path = require('path');
var request = require('request');
var exphbs  = require('express3-handlebars');
var validator = require('express-validator');
var logger = require('./logger');
var app = express();
var hbs;

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));

hbs = exphbs.create({
	defaultLayout: 'main',
	helpers: {
		option_selector: function(value, test) {
			console.log("test: ", test);
			console.log("value: ", value);
			// console.log("this: ", this);
			if (test === undefined) {
				var selected = '';
			} else {
				var selected = value.toLowerCase() === (test.toString()).toLowerCase() ? 'selected="selected"' : '';
			}
			return selected;
		}
	}
});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.multipart());
app.use(express.json());
app.use(express.urlencoded());
app.use(validator());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));
// app.use(express.bodyParser());
// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler({uploadDir: './uploads'}));
}

app.get('/', routes.index);
app.get('/add-model', models.form);
app.post('/add-model', models.post);
app.post('/image', models.image);

app.get('/file-upload', uploader.view);
app.post('/file-upload', uploader.upload);

http.createServer(app).listen(app.get('port'), function() {
	logger.info("logging here");
  console.log('Express server listening on port ' + app.get('port'));
});
