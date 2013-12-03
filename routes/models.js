
/*
 * GET / POST models routes.
 */

function remote_add(fields, callback) {

  var model = {
    // "id": null,
    "version": 0,
    "memberId": 1386014360861,
    // "pornstarId": null,
    // "username": null,
    "stageName": "Beate Uhse",
    "fullLegalName": "Beate Agatha Uhse",
    // "otherNames": "betty",
    // "maidenName": null,
    "email": "beateuhse@kink.com",
    "dateOfBirth": [
      2013,
      12,
      2
    ],
    "country": "United Stated",
    "phoneNumber": "555-555-5555",
    "idExpirationDate": [
      2013,
      12,
      2
    ],
    "idPhotoUuid1": "fb5daf46-c1bd-42b6-9f6a-58ea49cd0aec",
    "idPhotoUuid2": "fb5daf45-c1bd-42b6-9f6a-58ea49cd0aec",
    "status": "PENDING",
    // "createdOn": null,
    // "modifiedOn": null,
    // "modifiedBy": null
  };
  var options = {
      url: 'http://localhost:8090/kink-modelapplication-rest/modelapplication',
      method: 'POST',
      header: {'Content-type': 'application/json'},
      json: model
  };
  var remote = request(options, function(error, response, body) {
      console.log(body);
  });
}

exports.add = function(req, response) {
  var page = { title: 'Add a Live Model', message: '', errors: ''};
  if (req.method === 'POST') {
    page.fields = req.body;

    req.assert('stageName', 'Stage Name is required').notEmpty();
    req.assert('stageName', 'Stage Name should contain only alphanumeric characters').is(/^[a-zA-Z0-9\-\_]+$/, 'g');
    req.assert('email', 'Email Address is not valid').isEmail();
    req.assert('phoneNumber', 'Phone number can not be empty').notEmpty();
    req.assert('phoneNumber', 'Phone numbers should not contain letters or weird ass characters.').is(/^[0-9\-\s\+]+$/, 'g');

    var errors = req.validationErrors();
    if (errors) {
      console.log(errors);
      page.errors = errors;
    }
    else {
      console.log("success");
    }
  }
  response.render('./models/add', page);
};

exports.image = function(req, response) {
  var data = {id: 12345};
  response.json(data);
}