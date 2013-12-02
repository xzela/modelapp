
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'Live Model Application' });
};

exports.add = function(request, response) {
  var page = { title: 'Add a Live Model', message: '', errors: ''};
  if (request.method === 'POST') {
    request.assert('name', 'Name is required').notEmpty();
    var errors = request.validationErrors();
    if (errors) {
      console.log(errors);
      page.errors = errors;
    }
  }
  response.render('add', page);
};