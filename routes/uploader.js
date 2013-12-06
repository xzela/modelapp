//http://beta.kinklive.com/gobbler/AjaxUploadIdPhotoServlet.ajax?qqfile=1fbKHlX.gif

var fs = require('fs');
var path = require('path');
var request = require('request');

function callback(error, response, body) {
	console.log(response);
	if (!error && response.statusCode == 200) {
		var info = JSON.parse(body);
		console.log(info);
	}
}


exports.view = function(req, response) {
	response.render('upload_test');
};

exports.upload = function(req, response) {
	console.log("### intial upload");
	var r = request.post('http://beta.kinklive.com/gobbler/AjaxUploadIdPhotoServlet.ajax', function(err, res, body) {
		console.log("#### File uploaded to Gobbler!");
		if (!err && res.statusCode == 200) {
			console.log("##### Gobblers still up and recieved the file");
			var info = JSON.parse(body);
			console.log(info);
			if (info.success) {
				console.log("##### Gobbler accepted the file. " + info.msg);
				response.send(info);
			}
			else {
				console.log("#### Gobbler made a boo boo. " + info.msg);
				response.send(info.msg);
			}

		} else {
			// console.log(error);
			response.send(error);
		}
	});
	var form = r.form();
	form.append('file', fs.createReadStream(req.files.photo.path));
	console.log("### sending files...");
	//response.send("done");
};



// Request URL:http://beta.kinklive.com/gobbler/AjaxUploadIdPhotoServlet.ajax?qqfile=1fbKHlX.gif
// Request Method:POST
// Status Code:200 OK
// Request Headersview source
// Accept:*/*
// Accept-Encoding:gzip,deflate,sdch
// Accept-Language:en-US,en;q=0.8
// Cache-Control:no-cache
// Connection:keep-alive
// Content-Length:405728
// Content-Type:application/octet-stream
// Cookie:sso_initial=check
// DNT:1
// Host:beta.kinklive.com
// Origin:http://beta.kinklive.com
// Pragma:no-cache
// Referer:http://beta.kinklive.com/kink-live/
// User-Agent:Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.57 Safari/537.36
// X-File-Name:1fbKHlX.gif
// X-Mime-Type:image/gif
// X-Requested-With:XMLHttpRequest
// Query String Parametersview sourceview URL encoded
// qqfile:1fbKHlX.gif
// Response Headersview source
// Content-Type:text/html;charset=ISO-8859-1
// Date:Thu, 05 Dec 2013 20:12:45 GMT
// Server:Apache-Coyote/1.1
// Transfer-Encoding:chunked