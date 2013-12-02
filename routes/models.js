
/*
 * GET / POST models listing.
 */

exports.index = function(request, response){
  response.render('models', {title: 'add a model'});
};

exports.list = function(request, response) {
  response.send("listing all models");
};

exports.add = function(request, response) {
  response.send("model added");
}