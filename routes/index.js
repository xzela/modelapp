
/*
 * GET home page.
 */

//http://localhost:8090/kink-modelapplication-rest/modelapplication

exports.index = function(req, res){
  res.render('index', { title: 'Live Model Application' });
};
