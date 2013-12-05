

exports.view = function(req, response) {
	response.render('upload_test');
};

exports.upload = function(req, response) {
	console.log(req.files.photo);
	response.send("done");
};